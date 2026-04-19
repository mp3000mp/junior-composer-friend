import { SplendidGrandPiano } from 'smplr'
import { ref } from 'vue'
import { BASE_OCTAVE } from '@/music/player/types'
import { type Note } from '@/music/types'
import { type Chord } from '@/music/chord/types'
import { getIntervalFromC } from '@/music/utils'

const PIANO_OCTAVE_MIN = BASE_OCTAVE - 1
const PIANO_OCTAVE_MAX = BASE_OCTAVE + 1
const MIDI_MIN = (PIANO_OCTAVE_MIN + 1) * 12
const MIDI_MAX = (PIANO_OCTAVE_MAX + 1) * 12 + 11

const NOTES_TO_LOAD = {
  notes: Array.from({ length: MIDI_MAX - MIDI_MIN + 1 }, (_, i) => MIDI_MIN + i),
  velocityRange: [0, 127] as [number, number],
}

export const pianoLoadProgress = ref<{ loaded: number; total: number } | null>(null)

class Player {
  context: AudioContext | null = null
  piano: SplendidGrandPiano | null = null
  isInitialized: boolean = false
  startTime: number | null = null
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

  public initEager() {
    this.initialize()
  }

  public setVolume(volume: number) {
    this.volume = volume
  }

  private resetStartTime() {
    this.startTime = null
  }

  private noteToMidi(note: Note, octave: number): number {
    const semitone = ((getIntervalFromC(note) % 12) + 12) % 12
    return (octave + 1) * 12 + semitone
  }

  private play(note: Note, octave: number, durationMs: number, delayMs: number = 0) {
    this.initialize()
    if (!this.piano || !this.context) return

    if (this.context.state === 'suspended') {
      this.context.resume()
    }

    if (this.startTime === null) {
      this.startTime = this.context.currentTime
    }

    this.piano.start({
      note: this.noteToMidi(note, octave),
      velocity: Math.round(Math.sqrt(this.volume) * 127),
      duration: durationMs / 1000,
      time: this.startTime + delayMs / 1000,
    })
  }

  public playNote(note: Note, octave: number, durationMs: number, delayMs: number = 0) {
    this.resetStartTime()
    this.play(note, octave, durationMs, delayMs)
  }

  public playChord(chord: Chord, delayMs: number = 0) {
    if (chord.length === 0) {
      return
    }

    const playedChordDurationMs = 0 === delayMs ? 1000 : delayMs
    const totalDurationMs = chord.length * delayMs + playedChordDurationMs

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
