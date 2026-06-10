import * as PlyrModule from 'plyr'
import type { Options as PlyrOptions } from 'plyr'
import { mergePlyrOptions, parseDataOptions } from './plyr-utils.js'

// Handle different module export formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plyr = (PlyrModule as any).default ?? (PlyrModule as any)

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_CONTROLS = [
  'play',
  'progress',
  'current-time',
  'mute',
  'volume',
  'settings',
  'fullscreen',
] as const

const DEFAULT_I18N: PlyrOptions['i18n'] = {
  play: 'Odtwórz',
  pause: 'Pauza',
  mute: 'Wycisz',
  unmute: 'Włącz dźwięk',
  enterFullscreen: 'Pełny ekran',
  exitFullscreen: 'Zamknij pełny ekran',
  enableCaptions: 'Włącz napisy',
  disableCaptions: 'Wyłącz napisy',
  currentTime: 'Obecny czas',
  duration: 'Czas trwania',
  volume: 'Głośność',
  settings: 'Ustawienia',
  speed: 'Prędkość',
  quality: 'Jakość',
}

const DEFAULT_OPTIONS: PlyrOptions = {
  controls: [...DEFAULT_CONTROLS],
  invertTime: true,
  toggleInvert: false,
  i18n: DEFAULT_I18N,
}

// ============================================
// SVG ICONS
// ============================================

const PLAY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M8 5.14v14l11-7-11-7z"/>
</svg>`

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Creates custom play button overlay
 */
function createPlayButton(): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.className = 'c-video-player__play-btn'
  btn.setAttribute('aria-label', 'Odtwórz')
  btn.setAttribute('type', 'button')
  btn.innerHTML = PLAY_ICON_SVG
  return btn
}

/**
 * Creates title bar with gradient background
 */
function createTitleBar(title: string): HTMLDivElement {
  const bar = document.createElement('div')
  bar.className = 'c-video-player__title'

  const heading = document.createElement('h4')
  heading.className = 'c-video-player__title-text'
  heading.textContent = title

  bar.appendChild(heading)
  return bar
}

// ============================================
// PLAYER INITIALIZATION
// ============================================

type PlyrInstance = InstanceType<typeof Plyr>
type VideoPlayerTarget = string | HTMLElement | null | undefined

export interface VideoPlayerContext {
  player: PlyrInstance
  container: HTMLElement
}

export interface VideoPlayersInitConfig {
  options?: Partial<PlyrOptions>
  getOptions?: (container: HTMLElement) => Partial<PlyrOptions> | undefined
  onInit?: (context: VideoPlayerContext) => void
}

// Extended HTMLElement with player instance storage
interface VideoPlayerContainer extends HTMLElement {
  __videoPlayerInstance?: VideoPlayerInstance
}

interface VideoPlayerInstance {
  player: PlyrInstance
  container: HTMLElement
  playBtn: HTMLButtonElement
  titleBar: HTMLDivElement | null
  destroy: () => void
}

function isVideoPlayersInitConfig(
  config: Partial<PlyrOptions> | VideoPlayersInitConfig,
): config is VideoPlayersInitConfig {
  return 'options' in config || 'getOptions' in config || 'onInit' in config
}

function normalizeInitConfig(
  config: Partial<PlyrOptions> | VideoPlayersInitConfig = {},
): Required<Pick<VideoPlayersInitConfig, 'options'>> & Omit<VideoPlayersInitConfig, 'options'> {
  if (isVideoPlayersInitConfig(config)) {
    return {
      options: config.options ?? {},
      getOptions: config.getOptions,
      onInit: config.onInit,
    }
  }

  return {
    options: config,
  }
}

function resolveVideoPlayerContainer(
  target: VideoPlayerTarget,
  root: Document | Element = document,
): VideoPlayerContainer | null {
  if (!target) {
    return null
  }

  if (typeof target === 'string') {
    const element = root.querySelector<HTMLElement>(target)
    return resolveVideoPlayerContainer(element)
  }

  if (target.matches('[data-video-player]')) {
    return target as VideoPlayerContainer
  }

  return target.closest<VideoPlayerContainer>('[data-video-player]')
}

function createVideoPlayerHandlers(
  container: HTMLElement,
  player: PlyrInstance,
  titleBar: HTMLDivElement | null,
) {
  let isCurrentlySeeking = false

  const handlePlay = () => {
    container.classList.add('is-playing')
  }

  const handlePause = () => {
    container.classList.remove('is-playing')
  }

  const handleEnded = () => {
    container.classList.remove('is-playing')
  }

  const handleControlsShown = () => {
    titleBar?.classList.add('is-visible')
  }

  const handleControlsHidden = () => {
    titleBar?.classList.remove('is-visible')
  }

  const handleSeeking = () => {
    if (!isCurrentlySeeking) {
      isCurrentlySeeking = true
      player.elements.container?.classList.add('plyr--loading')
    }
  }

  const handleTimeUpdate = () => {
    if (isCurrentlySeeking && !player.seeking) {
      player.elements.container?.classList.remove('plyr--loading')
      isCurrentlySeeking = false
    }
  }

  const handlePlayBtnClick = () => {
    player.play()
  }

  return {
    handlePlay,
    handlePause,
    handleEnded,
    handleControlsShown,
    handleControlsHidden,
    handleSeeking,
    handleTimeUpdate,
    handlePlayBtnClick,
  }
}

function attachVideoPlayerEvents(
  player: PlyrInstance,
  playBtn: HTMLButtonElement,
  handlers: ReturnType<typeof createVideoPlayerHandlers>,
): void {
  player.on('play', handlers.handlePlay)
  player.on('pause', handlers.handlePause)
  player.on('ended', handlers.handleEnded)
  player.on('controlsshown', handlers.handleControlsShown)
  player.on('controlshidden', handlers.handleControlsHidden)
  player.on('seeking', handlers.handleSeeking)
  player.on('timeupdate', handlers.handleTimeUpdate)
  playBtn.addEventListener('click', handlers.handlePlayBtnClick)
}

function createVideoPlayerDestroy(
  player: PlyrInstance,
  playBtn: HTMLButtonElement,
  titleBar: HTMLDivElement | null,
  handlers: ReturnType<typeof createVideoPlayerHandlers>,
): () => void {
  return () => {
    try {
      player.off('play', handlers.handlePlay)
      player.off('pause', handlers.handlePause)
      player.off('ended', handlers.handleEnded)
      player.off('controlsshown', handlers.handleControlsShown)
      player.off('controlshidden', handlers.handleControlsHidden)
      player.off('seeking', handlers.handleSeeking)
      player.off('timeupdate', handlers.handleTimeUpdate)

      playBtn.removeEventListener('click', handlers.handlePlayBtnClick)
      playBtn.remove()
      titleBar?.remove()

      player.destroy()
    } catch {
      // Ignore cleanup errors
    }
  }
}

function initVideoPlayer(
  container: HTMLElement,
  options: Partial<PlyrOptions> = {},
  onInit?: (context: VideoPlayerContext) => void,
): VideoPlayerInstance | null {
  const target = container.querySelector('video')

  if (!target) {
    console.warn('[video-player] No video element found in container:', container)
    return null
  }

  const player = new Plyr(target, mergePlyrOptions(DEFAULT_OPTIONS, options))
  const playBtn = createPlayButton()
  container.appendChild(playBtn)

  const title = container.dataset.title
  const titleBar = title ? createTitleBar(title) : null
  if (titleBar) {
    container.appendChild(titleBar)
    titleBar.classList.add('is-visible')
  }

  const handlers = createVideoPlayerHandlers(container, player, titleBar)
  attachVideoPlayerEvents(player, playBtn, handlers)

  onInit?.({
    player,
    container,
  })

  return {
    player,
    container,
    playBtn,
    titleBar,
    destroy: createVideoPlayerDestroy(player, playBtn, titleBar, handlers),
  }
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Initializes all video players in the given root element
 *
 * @example
 * // Basic file video
 * <div class="c-video-player" data-video-player>
 *   <video poster="..." preload="metadata">
 *     <source src="..." type="video/mp4">
 *   </video>
 * </div>
 *
 * @example
 * // Video with title
 * <div class="c-video-player" data-video-player data-title="Tytuł video">
 *   <video>...</video>
 * </div>
 */
export const initVideoPlayers = (
  root: Document | Element = document,
  config: Partial<PlyrOptions> | VideoPlayersInitConfig = {},
): PlyrInstance[] => {
  const normalizedConfig = normalizeInitConfig(config)
  const containers = Array.from(root.querySelectorAll<VideoPlayerContainer>('[data-video-player]'))
  const players: PlyrInstance[] = []

  containers.forEach((container) => {
    // Skip already initialized
    if (container.dataset.videoPlayerInit === 'true') {
      return
    }
    container.dataset.videoPlayerInit = 'true'

    const instance = initVideoPlayer(
      container,
      mergePlyrOptions(
        normalizedConfig.options,
        parseDataOptions(container, 'video-player'),
        normalizedConfig.getOptions?.(container),
      ),
      normalizedConfig.onInit,
    )
    if (instance) {
      players.push(instance.player)

      // Store instance for potential cleanup
      container.__videoPlayerInstance = instance
    }
  })

  return players
}

export const getVideoPlayer = (
  target: VideoPlayerTarget,
  root: Document | Element = document,
): PlyrInstance | null => {
  const container = resolveVideoPlayerContainer(target, root)
  return container?.__videoPlayerInstance?.player ?? null
}

/**
 * Destroys all video players in the given root element
 */
export const destroyVideoPlayers = (root: Document | Element = document): void => {
  const containers = Array.from(root.querySelectorAll<VideoPlayerContainer>('[data-video-player]'))

  containers.forEach((container) => {
    const instance = container.__videoPlayerInstance
    if (instance) {
      instance.destroy()
      delete container.__videoPlayerInstance
      delete container.dataset.videoPlayerInit
    }
  })
}
