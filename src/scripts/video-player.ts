import * as PlyrModule from 'plyr'
import type { Options as PlyrOptions } from 'plyr'

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

/**
 * Initializes a single video player with all features
 */
function initVideoPlayer(
  container: HTMLElement,
  options: Partial<PlyrOptions> = {},
): VideoPlayerInstance | null {
  const target = container.querySelector('video')

  if (!target) {
    console.warn('[video-player] No video element found in container:', container)
    return null
  }

  // Merge options
  const mergedOptions: PlyrOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  // Initialize Plyr
  const player = new Plyr(target, mergedOptions)

  // Create overlay elements
  const playBtn = createPlayButton()
  container.appendChild(playBtn)

  const title = container.dataset.title
  const titleBar = title ? createTitleBar(title) : null
  if (titleBar) {
    container.appendChild(titleBar)
  }

  // State tracking for seeking
  let isCurrentlySeeking = false

  // ============================================
  // EVENT HANDLERS
  // ============================================

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

  // Attach event listeners
  player.on('play', handlePlay)
  player.on('pause', handlePause)
  player.on('ended', handleEnded)
  player.on('controlsshown', handleControlsShown)
  player.on('controlshidden', handleControlsHidden)
  player.on('seeking', handleSeeking)
  player.on('timeupdate', handleTimeUpdate)

  playBtn.addEventListener('click', handlePlayBtnClick)

  // Initial state - show title bar
  if (titleBar) {
    titleBar.classList.add('is-visible')
  }

  // ============================================
  // CLEANUP
  // ============================================

  const destroy = () => {
    try {
      player.off('play', handlePlay)
      player.off('pause', handlePause)
      player.off('ended', handleEnded)
      player.off('controlsshown', handleControlsShown)
      player.off('controlshidden', handleControlsHidden)
      player.off('seeking', handleSeeking)
      player.off('timeupdate', handleTimeUpdate)

      playBtn.removeEventListener('click', handlePlayBtnClick)
      playBtn.remove()
      titleBar?.remove()

      player.destroy()
    } catch {
      // Ignore cleanup errors
    }
  }

  return {
    player,
    container,
    playBtn,
    titleBar,
    destroy,
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
  options: Partial<PlyrOptions> = {},
): PlyrInstance[] => {
  const containers = Array.from(root.querySelectorAll<VideoPlayerContainer>('[data-video-player]'))
  const players: PlyrInstance[] = []

  containers.forEach((container) => {
    // Skip already initialized
    if (container.dataset.videoPlayerInit === 'true') {
      return
    }
    container.dataset.videoPlayerInit = 'true'

    const instance = initVideoPlayer(container, options)
    if (instance) {
      players.push(instance.player)

      // Store instance for potential cleanup
      container.__videoPlayerInstance = instance
    }
  })

  return players
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
