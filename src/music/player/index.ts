import { computeFrequency, getIntervalFromC } from '@/music/utils'
import { BASE_OCTAVE } from '@/music/player/types'
import { type Note } from '@/music/types'
import { type Chord } from '@/music/chord/types'

class Player {
  context!: AudioContext
  compressor!: DynamicsCompressorNode
  isInitialized: boolean = false
  startTime: number | null = null
  volume: number = 0.1

  private initialize() {
    if (this.isInitialized) {
      return
    }
    this.context = new AudioContext()
    this.compressor = this.context.createDynamicsCompressor()
    this.compressor.connect(this.context.destination)
    this.isInitialized = true
  }

  public setVolume(volume: number) {
    this.volume = volume
  }

  private resetStartTime() {
    this.startTime = null
  }

  private play(note: Note, octave: number, durationMs: number, delayMs: number = 0) {
    this.initialize()

    if (this.startTime === null) {
      this.startTime = this.context.currentTime
    }

    const startTime = this.startTime + delayMs / 1000
    const duration = durationMs / 1000
    const ringDuration = duration * 3
    const freq = computeFrequency(note, octave)

    const filter = this.context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(6000, startTime)
    filter.frequency.exponentialRampToValueAtTime(600, startTime + ringDuration)
    filter.connect(this.compressor)

    const masterGain = this.context.createGain()
    masterGain.gain.setValueAtTime(0, startTime)
    masterGain.gain.linearRampToValueAtTime(this.volume, startTime + 0.005)
    masterGain.gain.exponentialRampToValueAtTime(this.volume * 0.65, startTime + 0.08)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + ringDuration)
    masterGain.connect(filter)

    const harmonics = [
      { ratio: 1, gain: 1.0 },
      { ratio: 2, gain: 0.4 },
      { ratio: 3, gain: 0.15 },
      { ratio: 4, gain: 0.08 },
      { ratio: 5, gain: 0.04 },
    ]

    let activeOscs = harmonics.length
    for (const h of harmonics) {
      const harmGain = this.context.createGain()
      harmGain.gain.setValueAtTime(h.gain, startTime)
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + ringDuration * (1.5 / h.ratio))
      harmGain.connect(masterGain)

      const osc = this.context.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq * h.ratio, startTime)
      osc.connect(harmGain)
      osc.onended = () => {
        osc.disconnect()
        harmGain.disconnect()
        if (--activeOscs === 0) {
          masterGain.disconnect()
          filter.disconnect()
        }
      }
      osc.start(startTime)
      osc.stop(startTime + ringDuration + 0.1)
    }
  }

  public playNote(note: Note, octave: number, durationMs: number, delayMs: number = 0) {
    this.resetStartTime()
    this.play(note, octave, durationMs, delayMs)
  }

  public playChord(chord: Chord, delayMs: number = 0) {
    if (chord.length === 0) {
      return
    }

    const platedChordDurationMs = 0 === delayMs ? 1000 : delayMs
    const totalDurationMs = chord.length * delayMs + platedChordDurationMs

    this.resetStartTime()
    let currentOctave = BASE_OCTAVE
    let previousNoteIndex = getIntervalFromC(chord[0])
    for (let i = 0; i < chord.length; i++) {
      const currentNoteIndex = getIntervalFromC(chord[i])
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
