import { SplendidGrandPiano } from 'smplr'
import { computed, ref } from 'vue'
import { KEYBOARD_MIDI_MAX, KEYBOARD_MIDI_MIN } from '@/music/player/types'
import { type Chord } from '@/music/chord/types'
import { chordToMidi } from '@/music/utils'

const NOTES_TO_LOAD = {
  notes: Array.from(
    { length: KEYBOARD_MIDI_MAX - KEYBOARD_MIDI_MIN + 1 },
    (_, i) => KEYBOARD_MIDI_MIN + i,
  ),
  velocityRange: [0, 127] as [number, number],
}

export const pianoLoadProgress = ref<{ loaded: number; total: number } | null>(null)
export const isPianoLoaded = computed(
  () =>
    pianoLoadProgress.value !== null &&
    pianoLoadProgress.value.loaded >= pianoLoadProgress.value.total,
)
export const pianoLoadPercent = computed(() => {
  if (!pianoLoadProgress.value || pianoLoadProgress.value.total === 0) return 0
  return Math.round((pianoLoadProgress.value.loaded / pianoLoadProgress.value.total) * 100)
})

class Player {
  context: AudioContext | null = null
  piano: SplendidGrandPiano | null = null
  isInitialized: boolean = false
  volume: number = 0.7

  private initialize() {
    if (this.isInitialized) {
      return
    }
    this.context = new AudioContext()
    this.piano = new SplendidGrandPiano(this.context, {
      notesToLoad: NOTES_TO_LOAD,
      onLoadProgress: (progress) => {
        pianoLoadProgress.value = progress
      },
    })
    this.isInitialized = true
  }

  /** Starts loading the samples without waiting for the first note. */
  public preload() {
    this.initialize()
  }

  public setVolume(volume: number) {
    this.volume = volume
  }

  private play(midis: number[], durationMs: (index: number) => number, delayMs: number) {
    this.initialize()
    const { piano, context } = this
    if (!piano || !context) return

    if (context.state === 'suspended') {
      context.resume()
    }

    const startTime = context.currentTime
    midis.forEach((midi, i) => {
      piano.start({
        note: midi,
        velocity: Math.round(Math.sqrt(this.volume) * 127),
        duration: durationMs(i) / 1000,
        time: startTime + (delayMs * i) / 1000,
      })
    })
  }

  public playMidi(midi: number, durationMs: number) {
    this.play([midi], () => durationMs, 0)
  }

  /** Plays the chord as placed by chordToMidi; a delay > 0 arpeggiates it. */
  public playChord(chord: Chord, delayMs: number = 0) {
    if (chord.length === 0) {
      return
    }

    const playedChordDurationMs = 0 === delayMs ? 1000 : delayMs
    const totalDurationMs = chord.length * delayMs + playedChordDurationMs

    this.play(chordToMidi(chord), (i) => totalDurationMs - delayMs * i, delayMs)
  }
}

const player = new Player()

export function usePlayer() {
  return player
}
