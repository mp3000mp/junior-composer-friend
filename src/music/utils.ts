import { BASE_A_FREQUENCY, type Chord, CHROMATIC_SCALE, type Note } from '@/music/types'

export function computeFrequency(note: Note, octave: number): number {
  const octaveRatio = Math.pow(2, octave - 4)
  const aFrequency = BASE_A_FREQUENCY * octaveRatio
  const aIndex = CHROMATIC_SCALE.indexOf('A')
  const noteIndex = CHROMATIC_SCALE.indexOf(note)
  const semitoneOffset = noteIndex - aIndex

  return Math.round(aFrequency * Math.pow(2, semitoneOffset / 12))
}

export function transposeNote(baseNote: Note, interval: number): Note {
  const rootIndex = CHROMATIC_SCALE.indexOf(baseNote)
  const newIndex = (rootIndex + interval) % CHROMATIC_SCALE.length
  return CHROMATIC_SCALE[newIndex]
}

export function transposeChord(chord: Chord, interval: number): Chord {
  return chord.map((note) => transposeNote(note, interval))
}
