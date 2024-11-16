export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export type Chord = Note[]
export type Degree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'
export type Scale = Note[]

export const CHROMATIC_SCALE: Scale = [
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
export const ORDERED_DEGREES: Degree[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

type ScaleInterval = 1 | 2
export type ScaleIntervals = ScaleInterval[]

export enum Mode {
  Ionian = 'Ionian',
  Dorian = 'Dorian',
  Phrygian = 'Phrygian',
  Lydian = 'Lydian',
  Mixolydian = 'Mixolydian',
  Aeolian = 'Aeolian',
  Locrian = 'Locrian',
}

// todo générer en décalant depuis major ?
export const MODE_INTERVALS: Record<Mode, ScaleIntervals> = {
  [Mode.Ionian]: [2, 2, 1, 2, 2, 2, 1],
  [Mode.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  [Mode.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [Mode.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [Mode.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  [Mode.Aeolian]: [2, 1, 2, 2, 1, 2, 2],
  [Mode.Locrian]: [1, 2, 2, 1, 2, 2, 2],
}

export enum OrderedNote {
  Tonic = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  Fifth = 4,
  Sixth = 5,
  Seventh = 6,
}

export enum ChordStructure {
  Power = 'Power',
  Triad = 'Triad',
  Tetrad = 'Tetrad',
  Ninth = 'Ninth',
  AddedNinth = 'AddedNinth',
  SuspendedSecond = 'SuspendedSecond',
  SeventhSuspendedSecond = 'SeventhSuspendedSecond',
  Eleventh = 'Eleventh',
  AddedEleventh = 'AddedEleventh',
  SuspendedFourth = 'SuspendedFourth',
  SeventhSuspendedFourth = 'SeventhSuspendedFourth',
  NinthSuspendedFourth = 'NinthSuspendedFourth',
  Thirteenth = 'Thirteenth',
  Sixth = 'Sixth',
  SixthNinth = 'SixthNinth',
}

export const CHORD_STRUCTURE_DEFINITIONS: Record<ChordStructure, OrderedNote[]> = {
  [ChordStructure.Power]: [OrderedNote.Tonic, OrderedNote.Fifth],
  [ChordStructure.Triad]: [OrderedNote.Tonic, OrderedNote.Third, OrderedNote.Fifth],
  [ChordStructure.Tetrad]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
  ],
  [ChordStructure.Ninth]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
    OrderedNote.Second,
  ],
  [ChordStructure.AddedNinth]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Second,
  ],
  [ChordStructure.SuspendedSecond]: [OrderedNote.Tonic, OrderedNote.Second, OrderedNote.Fifth],
  [ChordStructure.SeventhSuspendedSecond]: [
    OrderedNote.Tonic,
    OrderedNote.Second,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
  ],
  [ChordStructure.Eleventh]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
    OrderedNote.Second,
    OrderedNote.Fourth,
  ],
  [ChordStructure.AddedEleventh]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Fourth,
  ],
  [ChordStructure.SuspendedFourth]: [OrderedNote.Tonic, OrderedNote.Fourth, OrderedNote.Fifth],
  [ChordStructure.SeventhSuspendedFourth]: [
    OrderedNote.Tonic,
    OrderedNote.Fourth,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
  ],
  [ChordStructure.NinthSuspendedFourth]: [
    OrderedNote.Tonic,
    OrderedNote.Fourth,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
    OrderedNote.Second,
  ],
  [ChordStructure.Thirteenth]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Seventh,
    OrderedNote.Second,
    OrderedNote.Fourth,
    OrderedNote.Sixth,
  ],
  [ChordStructure.Sixth]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Sixth,
  ],
  [ChordStructure.SixthNinth]: [
    OrderedNote.Tonic,
    OrderedNote.Third,
    OrderedNote.Fifth,
    OrderedNote.Sixth,
    OrderedNote.Second,
  ],
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

export enum ChordQuality {
  Power = '5',
  Major = '',
  Minor = 'm',
  MajorSeventh = 'maj7',
  MinorSeventh = 'm7',
  DominantSeventh = '7',
  HalfDiminished = 'm7b5',
  SuspendedSecond = 'sus2',
  SeventhSuspendedSecond = '7sus2',
  SuspendedFourth = 'sus4',
  SeventhSuspendedFourth = '7sus4',
  NinthSuspendedFourth = '9sus4',
  MajorSixth = '6',
  MinorSixth = 'm6',
  MajorSixthNinth = '6/9',
  MajorNinth = '9',
  MinorNinth = '?9',
  MajorEleventh = '11',
  MinorEleventh = '?11',
  MajorThirteenth = '13',
  MinorThirteenth = '?13',
}

export const CHORD_QUALITY_DEFINITIONS: Record<ChordQuality, Interval[]> = {
  [ChordQuality.Power]: [Interval.Tonic, Interval.Fifth],
  [ChordQuality.Major]: [Interval.Tonic, Interval.MajorThird, Interval.Fifth],
  [ChordQuality.Minor]: [Interval.Tonic, Interval.MinorThird, Interval.Fifth],
  [ChordQuality.MajorSeventh]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.Fifth,
    Interval.MajorSeventh,
  ],
  [ChordQuality.MinorSeventh]: [
    Interval.Tonic,
    Interval.MinorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
  ],
  [ChordQuality.DominantSeventh]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
  ],
  [ChordQuality.HalfDiminished]: [
    Interval.Tonic,
    Interval.MinorThird,
    Interval.DiminishedFifth,
    Interval.MinorSeventh,
  ],
  [ChordQuality.SuspendedSecond]: [Interval.Tonic, Interval.Second, Interval.Fifth],
  [ChordQuality.SeventhSuspendedSecond]: [
    Interval.Tonic,
    Interval.Second,
    Interval.Fifth,
    Interval.MinorSeventh,
  ],
  [ChordQuality.SuspendedFourth]: [Interval.Tonic, Interval.Fourth, Interval.Fifth],
  [ChordQuality.SeventhSuspendedFourth]: [
    Interval.Tonic,
    Interval.Fourth,
    Interval.Fifth,
    Interval.MinorSeventh,
  ],
  [ChordQuality.NinthSuspendedFourth]: [
    Interval.Tonic,
    Interval.Fourth,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
  ],
  [ChordQuality.MajorSixth]: [Interval.Tonic, Interval.MajorThird, Interval.MajorSixth],
  [ChordQuality.MinorSixth]: [Interval.Tonic, Interval.MinorThird, Interval.MajorSixth],
  [ChordQuality.MajorSixthNinth]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.MajorSixth,
    Interval.Second,
  ],
  [ChordQuality.MajorNinth]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
  ],
  [ChordQuality.MinorNinth]: [
    Interval.Tonic,
    Interval.MinorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
  ],
  [ChordQuality.MajorEleventh]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
    Interval.Fourth,
  ],
  [ChordQuality.MinorEleventh]: [
    Interval.Tonic,
    Interval.MinorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
    Interval.Fourth,
  ],
  [ChordQuality.MajorThirteenth]: [
    Interval.Tonic,
    Interval.MajorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
    Interval.Fourth,
    Interval.MajorSixth,
  ],
  [ChordQuality.MinorThirteenth]: [
    Interval.Tonic,
    Interval.MinorThird,
    Interval.Fifth,
    Interval.MinorSeventh,
    Interval.Second,
    Interval.Fourth,
    Interval.MajorSixth,
  ],
}
