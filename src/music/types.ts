export type NoteLetter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type Alteration = 'bb' | 'b' | '' | '#' | '##'
export type NoteString = `${NoteLetter}${Alteration}`

export type Note = {
  letter: NoteLetter
  alteration: Alteration
}

export const NOTE_LETTERS: NoteLetter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
// export const ALTERATIONS: Alteration[] = ['bb', 'b', '', '#', '##']
export const LETTER_INTERVALS_FROM_C: Record<NoteLetter, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
}
export const ALTERATION_INTERVALS: Record<Alteration, number> = {
  bb: -2,
  b: -1,
  '': 0,
  '#': 1,
  '##': 2,
}

// Nombre de demi-tons dans une octave
export const SEMITONES_PER_OCTAVE = 12

export const WHOLE_TONE_LETTERS: Record<NoteLetter, boolean> = {
  C: true,
  D: true,
  E: false,
  F: true,
  G: true,
  A: true,
  B: false,
}
