import type Plyr from 'plyr'
import type { Options as PlyrOptions } from 'plyr'

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

export function initVideoPlayers(
  root?: Document | HTMLElement,
  config?: Partial<PlyrOptions> | VideoPlayersInitConfig,
): PlyrInstance[]

export function getVideoPlayer(
  target: VideoPlayerTarget,
  root?: Document | HTMLElement,
): PlyrInstance | null

export function destroyVideoPlayers(root?: Document | HTMLElement): void
