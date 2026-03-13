import * as PlyrModule from 'plyr'
import type { Options as PlyrOptions } from 'plyr'

// Handle different module export formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plyr = (PlyrModule as any).default ?? (PlyrModule as any)

type PlyrInstance = InstanceType<typeof Plyr>
type AudioPlayerTarget = string | HTMLElement | null | undefined

type UnknownRecord = Record<string, unknown>

export interface AudioPlayerContext {
  player: PlyrInstance
  container: HTMLElement
}

export interface AudioPlayersInitConfig {
  options?: Partial<PlyrOptions>
  getOptions?: (container: HTMLElement) => Partial<PlyrOptions> | undefined
  onInit?: (context: AudioPlayerContext) => void
  autoplay?: boolean
}

// Extended HTMLElement with player instance storage
interface AudioPlayerContainer extends HTMLElement {
  __audioPlayerInstance?: PlyrInstance
}

function isPlainObject(value: unknown): value is UnknownRecord {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function mergeInto(target: UnknownRecord, source: UnknownRecord): UnknownRecord {
  Object.entries(source).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      target[key] = [...value]
      return
    }

    if (isPlainObject(value)) {
      const base = isPlainObject(target[key]) ? (target[key] as UnknownRecord) : {}
      target[key] = mergeInto({ ...base }, value)
      return
    }

    target[key] = value
  })

  return target
}

function mergePlyrOptions(...sources: Array<Partial<PlyrOptions> | undefined>): PlyrOptions {
  return sources.reduce<UnknownRecord>((result, source) => {
    if (!source) {
      return result
    }

    return mergeInto(result, source as UnknownRecord)
  }, {}) as PlyrOptions
}

function isAudioPlayersInitConfig(
  config: Partial<PlyrOptions> | AudioPlayersInitConfig,
): config is AudioPlayersInitConfig {
  return 'options' in config || 'getOptions' in config || 'onInit' in config || 'autoplay' in config
}

function normalizeInitConfig(
  config: Partial<PlyrOptions> | AudioPlayersInitConfig = {},
): Required<Pick<AudioPlayersInitConfig, 'options'>> & Omit<AudioPlayersInitConfig, 'options'> {
  if (isAudioPlayersInitConfig(config)) {
    return {
      options: config.options ?? {},
      getOptions: config.getOptions,
      onInit: config.onInit,
      autoplay: config.autoplay,
    }
  }

  return {
    options: config,
  }
}

function parseDataOptions(container: HTMLElement): Partial<PlyrOptions> {
  const rawConfig = container.dataset.plyrConfig

  if (!rawConfig) {
    return {}
  }

  try {
    const parsed = JSON.parse(rawConfig)

    if (!isPlainObject(parsed)) {
      console.warn('[audio-player] data-plyr-config must be a JSON object:', container)
      return {}
    }

    return parsed as Partial<PlyrOptions>
  } catch {
    console.warn('[audio-player] Invalid JSON in data-plyr-config:', container)
    return {}
  }
}

function resolveAudioPlayerContainer(
  target: AudioPlayerTarget,
  root: Document | Element = document,
): AudioPlayerContainer | null {
  if (!target) {
    return null
  }

  if (typeof target === 'string') {
    const element = root.querySelector<HTMLElement>(target)
    return resolveAudioPlayerContainer(element)
  }

  if (target.matches('[data-audio-player]')) {
    return target as AudioPlayerContainer
  }

  return target.closest<AudioPlayerContainer>('[data-audio-player]')
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_CONTROLS = ['play', 'progress', 'current-time'] as const

const DEFAULT_I18N: PlyrOptions['i18n'] = {
  play: 'Odtwórz',
  pause: 'Pauza',
  currentTime: 'Obecny czas',
  duration: 'Czas trwania',
}

const DEFAULT_OPTIONS: PlyrOptions = {
  controls: [...DEFAULT_CONTROLS],
  invertTime: true,
  toggleInvert: true,
  i18n: DEFAULT_I18N,
}

// ============================================
// AUTOPLAY
// ============================================

function shouldAutoplay(
  normalizedConfig: ReturnType<typeof normalizeInitConfig>,
  plyrOptions: PlyrOptions,
): boolean {
  if (normalizedConfig.autoplay) {
    return true
  }

  return (plyrOptions as Record<string, unknown>).autoplay === true
}

function stripAutoplayFromOptions(options: PlyrOptions): PlyrOptions {
  const copy = { ...options } as Record<string, unknown>
  delete copy.autoplay
  return copy as PlyrOptions
}

function startMutedPlayback(media: HTMLMediaElement, player: PlyrInstance): void {
  media.muted = true
  media.setAttribute('muted', '')
  player.muted = true

  const doPlay = () => {
    media.muted = true
    const result = media.play()
    if (result) {
      result.catch((err) => {
        if (err.name === 'NotAllowedError') {
          waitForInteraction(media, player)
        }
      })
    }
  }

  if (media.readyState < 2) {
    media.addEventListener('canplay', doPlay, { once: true })
    media.load()
    return
  }

  doPlay()
}

const INTERACTION_EVENTS = ['click', 'touchstart', 'keydown'] as const

function waitForInteraction(media: HTMLMediaElement, player: PlyrInstance): void {
  const handler = () => {
    INTERACTION_EVENTS.forEach((evt) => document.removeEventListener(evt, handler, true))
    media.muted = true
    player.muted = true
    const result = media.play()
    if (result) {
      result.catch(() => {})
    }
  }

  INTERACTION_EVENTS.forEach((evt) =>
    document.addEventListener(evt, handler, { once: true, capture: true }),
  )
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Attempts muted autoplay on a Plyr instance.
 * Chrome requires the native media element to have muted=true
 * set programmatically right before calling play().
 */
export const attemptAutoplay = (player: PlyrInstance): void => {
  const media = player.media as HTMLMediaElement | undefined
  if (!media) {
    return
  }

  player.muted = true
  startMutedPlayback(media, player)
}

/**
 * Initializes all audio players in the given root element
 *
 * @example
 * <div class="c-audio-player" data-audio-player>
 *   <audio src="audio.mp3" preload="metadata"></audio>
 * </div>
 */
export const initAudioPlayers = (
  root: Document | Element = document,
  config: Partial<PlyrOptions> | AudioPlayersInitConfig = {},
): PlyrInstance[] => {
  const normalizedConfig = normalizeInitConfig(config)
  const containers = Array.from(root.querySelectorAll<AudioPlayerContainer>('[data-audio-player]'))
  const players: PlyrInstance[] = []

  containers.forEach((container) => {
    if (container.dataset.audioPlayerInit === 'true') {
      return
    }
    container.dataset.audioPlayerInit = 'true'

    const audio = container.querySelector('audio')
    if (!audio) {
      return
    }

    const mergedOptions = mergePlyrOptions(
      DEFAULT_OPTIONS,
      normalizedConfig.options,
      parseDataOptions(container),
      normalizedConfig.getOptions?.(container),
    )

    const wantsAutoplay = shouldAutoplay(normalizedConfig, mergedOptions)
    const finalOptions = wantsAutoplay ? stripAutoplayFromOptions(mergedOptions) : mergedOptions

    // Pre-set muted on native element before Plyr init so Chrome
    // does not consume and block the autoplay gesture
    if (wantsAutoplay) {
      audio.muted = true
      audio.setAttribute('muted', '')
    }

    const player = new Plyr(audio, finalOptions)

    players.push(player)

    // Store instance for potential cleanup
    container.__audioPlayerInstance = player

    if (wantsAutoplay) {
      let started = false

      const doAutoplay = () => {
        if (started) {
          return
        }
        started = true
        attemptAutoplay(player)
      }

      player.on('ready', doAutoplay)

      const media = player.media as HTMLMediaElement | undefined
      if (media) {
        media.addEventListener('canplay', doAutoplay, { once: true })
        media.addEventListener('loadeddata', doAutoplay, { once: true })
      }
    }

    normalizedConfig.onInit?.({
      player,
      container,
    })
  })

  return players
}

export const getAudioPlayer = (
  target: AudioPlayerTarget,
  root: Document | Element = document,
): PlyrInstance | null => {
  const container = resolveAudioPlayerContainer(target, root)
  return container?.__audioPlayerInstance ?? null
}

/**
 * Destroys all audio players in the given root element
 */
export const destroyAudioPlayers = (root: Document | Element = document): void => {
  const containers = Array.from(root.querySelectorAll<AudioPlayerContainer>('[data-audio-player]'))

  containers.forEach((container) => {
    const player = container.__audioPlayerInstance
    if (player) {
      try {
        player.destroy()
      } catch {
        // Ignore cleanup errors
      }
      delete container.__audioPlayerInstance
      delete container.dataset.audioPlayerInit
    }
  })
}
