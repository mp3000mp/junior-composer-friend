import { type Chord, CHROMATIC_SCALE, type Note } from '@/music/types'

export function transposeNote(baseNote: Note, interval: number): Note {
  const rootIndex = CHROMATIC_SCALE.indexOf(baseNote)
  const newIndex = (rootIndex + interval) % CHROMATIC_SCALE.length
  return CHROMATIC_SCALE[newIndex]
}

export function transposeChord(chord: Chord, interval: number): Chord {
  return chord.map((note) => transposeNote(note, interval))
}
