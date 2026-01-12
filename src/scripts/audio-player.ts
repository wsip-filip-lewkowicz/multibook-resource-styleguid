import * as PlyrModule from 'plyr'
import type { Options as PlyrOptions } from 'plyr'

// Handle different module export formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plyr = (PlyrModule as any).default ?? (PlyrModule as any)

type PlyrInstance = InstanceType<typeof Plyr>

// Extended HTMLElement with player instance storage
interface AudioPlayerContainer extends HTMLElement {
  __audioPlayerInstance?: PlyrInstance
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
// PUBLIC API
// ============================================

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
  options: Partial<PlyrOptions> = {},
): PlyrInstance[] => {
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

    const player = new Plyr(audio, {
      ...DEFAULT_OPTIONS,
      ...options,
    })

    players.push(player)

    // Store instance for potential cleanup
    container.__audioPlayerInstance = player
  })

  return players
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
