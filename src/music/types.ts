export type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type FlatNote = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'
export type SharpNote = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export type FullChromaticNote =
  // Natural notes
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'A'
  | 'B'
  // Single sharps
  | 'C#'
  | 'D#'
  | 'E#'
  | 'F#'
  | 'G#'
  | 'A#'
  | 'B#'
  // Single flats
  | 'Cb'
  | 'Db'
  | 'Eb'
  | 'Fb'
  | 'Gb'
  | 'Ab'
  | 'Bb'
  // Double sharps
  | 'C##'
  | 'D##'
  | 'E##'
  | 'F##'
  | 'G##'
  | 'A##'
  | 'B##'
  // Double flats
  | 'Cbb'
  | 'Dbb'
  | 'Ebb'
  | 'Fbb'
  | 'Gbb'
  | 'Abb'
  | 'Bbb'

export const NATURAL_CHROMATIC_SCALE: NaturalNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const FLAT_CHROMATIC_SCALE: FlatNote[] = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
]
export const SHARP_CHROMATIC_SCALE: SharpNote[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]
export const FULL_CHROMATIC_NOTES_INDICES: Record<FullChromaticNote, number> = {
  'B#': 0,
  C: 0,
  Dbb: 0,
  'B##': 1,
  'C#': 1,
  Db: 1,
  'C##': 2,
  D: 2,
  Ebb: 2,
  'D#': 3,
  Eb: 3,
  Fbb: 3,
  'D##': 4,
  E: 4,
  Fb: 4,
  'E#': 5,
  F: 5,
  Gbb: 5,
  'E##': 6,
  'F#': 6,
  Gb: 6,
  'F##': 7,
  G: 7,
  Abb: 7,
  'G#': 8,
  Ab: 8,
  'G##': 9,
  A: 9,
  Bbb: 9,
  'A#': 10,
  Bb: 10,
  Cbb: 10,
  'A##': 11,
  B: 11,
  Cb: 11,
}

export const ENHARMONIC_EQUIVALENTS: Partial<Record<FullChromaticNote, FullChromaticNote>> = {
  'C#': 'Db',
  'D#': 'Eb',
  'E#': 'F',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'B#': 'C',
  Cb: 'B',
  Db: 'C#',
  Eb: 'D#',
  Fb: 'E',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
}

export type Alteration = 'bb' | 'b' | '' | '#' | '##'
