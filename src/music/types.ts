export type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type FlatNote = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'
export type SharpNote = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export type FullChromaticNote =
  | 'C'
  | 'C#'
  | 'Db'
  | 'D'
  | 'D#'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'Gb'
  | 'G'
  | 'G#'
  | 'Ab'
  | 'A'
  | 'A#'
  | 'Bb'
  | 'B'

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

export const ENHARMONIC_EQUIVALENTS: Record<FullChromaticNote, FullChromaticNote> = {
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

export const BASE_OCTAVE = 4
export const BASE_A_FREQUENCY = 440

export type Alteration = 'bb' | 'b' | '' | '#' | '##'

// todo replace by NATURAL_DEGREE_SEMITONES
export enum OrderedNote {
  Tonic = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  Fifth = 4,
  Sixth = 5,
  Seventh = 6,
}

export enum Interval {
  Tonic = 0,
  DiminishedSecond = 1,
  Second = 2,
  MinorThird = 3, // or AugmentedSecond
  MajorThird = 4,
  Fourth = 5,
  DiminishedFifth = 6, // or AugmentedFourth
  Fifth = 7,
  MinorSixth = 8, // or AugmentedFifth
  MajorSixth = 9,
  MinorSeventh = 10,
  MajorSeventh = 11,
}
