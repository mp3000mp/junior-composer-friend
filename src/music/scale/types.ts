import type { Note } from '@/music/types'

export type NaturalDegree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'

export type Scale = Note[]
export type Interval = 1 | 2 | 3
export type ScaleIntervals = Interval[]

export const ORDERED_DEGREES: NaturalDegree[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

export enum ScaleEnum {
  // Major = 'major',
  // NaturalMinor = 'naturalMinor',
  Ionian = 'ionian',
  // 'Ionian#5' = 'ionian#5',
  // AugmentedIonian = 'augmentedIonian',
  Dorian = 'dorian',
  // 'Dorian#4' = 'dorian#4',
  // DorianB2 = 'dorianb2',
  Phrygian = 'phrygian',
  Lydian = 'lydian',
  LydianB7 = 'lydianB7',
  // 'Lydian#9' = 'lydian#9',
  Mixolydian = 'mixolydian',
  // MixolydianB6 = 'mixolydianB6',
  // MixolydianB9B13 = 'mixolydianB9B13',
  Eolian = 'eolian',
  MelodicMinor = 'melodicMinor',
  HarmonicMinor = 'harmonicMinor',
  GypsyMinor = 'gypsyMinor',
  DoubleHarmonicMinor = 'doubleHarmonicMinor',
  Locrian = 'locrian',
  // 'Locrian#2' = 'locrian#2',
  SuperLocrian = 'superLocrian',
  // Bebop = 'bebop',
  // BebopMinor = 'bebopMinor',
  // DominantBebop = 'dominantBebop',
  // HalfWholeDiminished = 'halfWholeDiminished',
  // WholeHalfDiminished = 'wholeHalfDiminished',
}

export const ScaleLabels = {
  // [ScaleEnum.Major]: 'major',
  // [ScaleEnum.NaturalMinor]: 'minor',
  [ScaleEnum.Ionian]: 'ionian (major)',
  // [ScaleEnum['Ionian#5']]: 'ionian #5',
  // [ScaleEnum.AugmentedIonian]: 'augmented ionian',
  [ScaleEnum.Dorian]: 'dorian',
  // [ScaleEnum['Dorian#4']]: 'dorian #4',
  // [ScaleEnum.DorianB2]: 'dorian b2',
  [ScaleEnum.Phrygian]: 'phrygian',
  [ScaleEnum.Lydian]: 'lydian',
  [ScaleEnum.LydianB7]: 'lydian b7 (dominant)',
  // [ScaleEnum['Lydian#9']]: 'lydian #9',
  [ScaleEnum.Mixolydian]: 'mixolydian',
  // [ScaleEnum.MixolydianB6]: 'mixolydian b6',
  // [ScaleEnum.MixolydianB9B13]: 'mixolydian b9 b13',
  [ScaleEnum.Eolian]: 'eolian (minor)',
  [ScaleEnum.MelodicMinor]: 'melodic minor',
  [ScaleEnum.HarmonicMinor]: 'harmonic minor',
  [ScaleEnum.GypsyMinor]: 'gypsy minor (arab)',
  [ScaleEnum.DoubleHarmonicMinor]: 'double harmonic minor',
  [ScaleEnum.Locrian]: 'locrian',
  // [ScaleEnum['Locrian#2']]: 'locrian #2',
  [ScaleEnum.SuperLocrian]: 'super locrian (altered)',
  // [ScaleEnum.Bebop]: 'bebop',
  // [ScaleEnum.BebopMinor]: 'bebop minor',
  // [ScaleEnum.DominantBebop]: 'dominant bebop',
  // [ScaleEnum.HalfWholeDiminished]: 'half whole diminished',
  // [ScaleEnum.WholeHalfDiminished]: 'whole half diminished',
}

const majorIntervals: ScaleIntervals = [2, 2, 1, 2, 2, 2, 1]
const minorIntervals: ScaleIntervals = [2, 1, 2, 2, 1, 2, 2]
export const SCALE_INTERVALS: Record<ScaleEnum, ScaleIntervals> = {
  // [ScaleEnum.Major]: majorIntervals,
  // [ScaleEnum.NaturalMinor]: minorIntervals,
  [ScaleEnum.Ionian]: majorIntervals,
  // [ScaleEnum['Ionian#5']]: [2, 2, 1, 3, 1, 2, 1],
  // [ScaleEnum.AugmentedIonian]: [2, 2, 2, 2, 1, 2, 1],
  [ScaleEnum.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  // [ScaleEnum['Dorian#4']]: [2, 1, 3, 1, 2, 1, 2],
  // [ScaleEnum.DorianB2]: [1, 2, 2, 2, 2, 1, 2],
  [ScaleEnum.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [ScaleEnum.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [ScaleEnum.LydianB7]: [2, 2, 2, 1, 2, 1, 2],
  // [ScaleEnum['Lydian#9']]: [3, 1, 2, 1, 2, 2, 1],
  [ScaleEnum.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  // [ScaleEnum.MixolydianB6]: [2, 2, 1, 2, 1, 2, 2],
  // [ScaleEnum.MixolydianB9B13]: [1, 3, 1, 2, 1, 2, 2],
  [ScaleEnum.Eolian]: minorIntervals,
  [ScaleEnum.MelodicMinor]: [2, 1, 2, 2, 2, 2, 1],
  [ScaleEnum.HarmonicMinor]: [2, 1, 2, 2, 1, 3, 1],
  [ScaleEnum.GypsyMinor]: [2, 1, 3, 1, 1, 3, 1],
  [ScaleEnum.DoubleHarmonicMinor]: [1, 3, 1, 2, 1, 3, 1],
  [ScaleEnum.Locrian]: [1, 2, 2, 1, 2, 2, 2],
  // [ScaleEnum['Locrian#2']]: [2, 1, 2, 1, 2, 2, 2],
  [ScaleEnum.SuperLocrian]: [1, 2, 1, 2, 2, 3, 1],
  // 8 notes scales
  // [ScaleEnum.Bebop]: [2, 2, 1, 2, 1, 1, 2, 1],
  // [ScaleEnum.BebopMinor]: [2, 1, 2, 2, 1, 1, 2, 1],
  // [ScaleEnum.DominantBebop]: [2, 2, 1, 2, 2, 1, 1, 1],
  // [ScaleEnum.HalfWholeDiminished]: [1, 2, 1, 2, 1, 2, 1, 2],
  // [ScaleEnum.WholeHalfDiminished]: [2, 1, 2, 1, 2, 1, 2, 1],
}
