import type Plyr from 'plyr'
import type { Options as PlyrOptions } from 'plyr'

type PlyrInstance = InstanceType<typeof Plyr>
type AudioPlayerTarget = string | HTMLElement | null | undefined

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

export function attemptAutoplay(player: PlyrInstance): void

export function initAudioPlayers(
  root?: Document | HTMLElement,
  config?: Partial<PlyrOptions> | AudioPlayersInitConfig,
): PlyrInstance[]

export function getAudioPlayer(
  target: AudioPlayerTarget,
  root?: Document | HTMLElement,
): PlyrInstance | null

export function destroyAudioPlayers(root?: Document | HTMLElement): void
