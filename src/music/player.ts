import { computeFrequency } from '@/music/utils'

class Player {
  context: AudioContext
  gainNode: GainNode
  isInitialized: boolean = false
  volume: number

  constructor() {
    this.volume = 0.2
  }

  private createOscillator(type: OscillatorType): OscillatorNode {
    const oscillatorNode = this.context.createOscillator()
    oscillatorNode.type = type
    oscillatorNode.connect(this.gainNode)
    return oscillatorNode
  }

  public initialize() {
    if (this.isInitialized) {
      return
    }
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.context.destination)
    this.setVolume(this.volume)
    this.isInitialized = true
  }

  public setVolume(volume: number) {
    this.gainNode.gain.value = volume
  }

  public play(note: number, octave: number, durationMs: number) {
    this.initialize()
    const oscillatorNode = this.createOscillator('sawtooth')
    oscillatorNode.frequency.setTargetAtTime(
      computeFrequency(note, octave),
      this.context.currentTime,
      0,
    )
    oscillatorNode.start(0)
    oscillatorNode.stop(this.context.currentTime + durationMs / 1000)
  }
}

const player = new Player()

export function usePlayer() {
  return player
}
