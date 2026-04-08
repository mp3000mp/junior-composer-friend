import { computeFrequency } from '@/music/utils'
import { BASE_OCTAVE } from '@/music/player/types'
import { SHARP_CHROMATIC_SCALE } from '@/music/types'
import { type Chord } from '@/music/chord/types'

class Player {
  context: AudioContext
  isInitialized: boolean = false
  startTime: number | null = null
  volume: number

  constructor() {
    this.volume = 0.1
  }

  private createOscillator(type: OscillatorType): OscillatorNode {
    const gainNode = this.context.createGain()
    gainNode.connect(this.context.destination)
    gainNode.gain.value = this.volume
    const oscillatorNode = this.context.createOscillator()
    oscillatorNode.type = type
    oscillatorNode.connect(gainNode)
    return oscillatorNode
  }

  public initialize() {
    if (this.isInitialized) {
      return
    }
    this.context = new AudioContext()
    this.setVolume(this.volume)
    this.isInitialized = true
  }

  public setVolume(volume: number) {
    this.volume = volume
    // todo update all active gains ?
  }

  private resetStartTime() {
    this.startTime = null
  }

  private play(note: number, octave: number, durationMs: number, delayMs: number = 0) {
    this.initialize()

    if (this.startTime === null) {
      this.startTime = this.context.currentTime
    }

    const oscillatorNode = this.createOscillator('sawtooth')
    oscillatorNode.frequency.setTargetAtTime(
      computeFrequency(note, octave),
      this.context.currentTime,
      0,
    )

    const startTime = this.startTime + delayMs / 1000
    oscillatorNode.start(startTime)
    oscillatorNode.stop(startTime + durationMs / 1000)
  }

  public playNote(note: number, octave: number, durationMs: number, delayMs: number = 0) {
    this.initialize()
    this.resetStartTime()
    this.play(note, octave, durationMs, delayMs)
  }

  public playChord(chord: Chord, delayMs: number = 0) {
    if (chord.length === 0) {
      return
    }
    this.initialize()

    const platedChordDurationMs = 0 === delayMs ? 1000 : delayMs
    const totalDurationMs = chord.length * delayMs + platedChordDurationMs

    this.resetStartTime()
    let currentOctave = BASE_OCTAVE
    let previousNoteIndex = SHARP_CHROMATIC_SCALE.indexOf(chord[0])
    for (let i = 0; i < chord.length; i++) {
      const currentNoteIndex = SHARP_CHROMATIC_SCALE.indexOf(chord[i])
      if (currentNoteIndex < previousNoteIndex) {
        currentOctave++
      }
      this.play(chord[i], currentOctave, totalDurationMs - delayMs * i, delayMs * i)
      previousNoteIndex = currentNoteIndex
    }
  }
}

const player = new Player()

export function usePlayer() {
  return player
}
