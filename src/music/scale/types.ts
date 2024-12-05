import type { FullChromaticNote } from '@/music/types'

export type NaturalDegree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'
export type FullChromaticDegree = 'I' | 'IIb' | 'II' | 'II#' | 'IIIb' | 'III' | 'IV' | 'IV#' | 'Vb' | 'V' | 'V#' | 'VIb' | 'VI' | 'VIIb' | 'VII'

export type Scale = FullChromaticNote[]
export type Interval = 1 | 2 | 3
export type ScaleIntervals = Interval[]

export const ORDERED_DEGREES: NaturalDegree[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

export const NATURAL_DEGREE_SEMITONES = {
  I: 0,
  II: 2,
  III: 4,
  IV: 5,
  V: 7,
  VI: 9,
  VII: 11,
}

export const FULL_CHROMATIC_DEGREE_SEMITONES = {
  I: 0,
  IIb: 1,
  II: 2,
  'II#': 3,
  IIIb: 3,
  III: 4,
  IVb: 4,
  IV: 5,
  'IV#': 6,
  Vb: 6,
  V: 7,
  'V#': 8,
  VIb: 8,
  VI: 9,
  VIIb: 10,
  VII: 11,
}

export enum ScaleEnum {
  // Major = 'major',
  // NaturalMinor = 'naturalMinor',
  Ionian = 'ionian',
  Dorian = 'dorian',
  Phrygian = 'phrygian',
  Lydian = 'lydian',
  DominantLydian = 'dominantLydian',
  Mixolydian = 'mixolydian',
  Eolian = 'eolian',
  MelodicMinor = 'melodicMinor',
  HarmonicMinor = 'harmonicMinor',
  GypsyMinor = 'gypsyMinor',
  DoubleHarmonicMinor = 'doubleHarmonicMinor',
  Locrian = 'locrian',
  SuperLocrian = 'superLocrian',
  Bebop = 'bebop',
  BebopMinor = 'bebopMinor',
  DominantBebop = 'dominantBebop',
  // HalfWholeDiminished = 'halfWholeDiminished',
  // WholeHalfDiminished = 'wholeHalfDiminished',
}

export const ScaleLabels = {
  // [ScaleEnum.Major]: 'major',
  // [ScaleEnum.NaturalMinor]: 'minor',
  [ScaleEnum.Ionian]: 'ionian (major)',
  [ScaleEnum.Dorian]: 'dorian',
  [ScaleEnum.Phrygian]: 'phrygian',
  [ScaleEnum.Lydian]: 'lydian',
  [ScaleEnum.DominantLydian]: 'dominant lydian (Bartok)',
  [ScaleEnum.Mixolydian]: 'mixolydian',
  [ScaleEnum.Eolian]: 'eolian (minor)',
  [ScaleEnum.MelodicMinor]: 'melodic minor',
  [ScaleEnum.HarmonicMinor]: 'harmonic minor',
  [ScaleEnum.GypsyMinor]: 'gypsy minor (arab)',
  [ScaleEnum.DoubleHarmonicMinor]: 'double harmonic minor',
  [ScaleEnum.Locrian]: 'locrian',
  [ScaleEnum.SuperLocrian]: 'super locrian (altered)',
  [ScaleEnum.Bebop]: 'bebop',
  [ScaleEnum.BebopMinor]: 'bebop minor',
  [ScaleEnum.DominantBebop]: 'dominant bebop',
  // [ScaleEnum.HalfWholeDiminished]: 'half whole diminished',
  // [ScaleEnum.WholeHalfDiminished]: 'whole half diminished',
}

const majorIntervals = [2, 2, 1, 2, 2, 2, 1]
const minorIntervals = [2, 1, 2, 2, 1, 2, 2]
export const SCALE_INTERVALS: Record<ScaleEnum, ScaleIntervals> = {
  // [ScaleEnum.Major]: majorIntervals,
  // [ScaleEnum.NaturalMinor]: minorIntervals,
  [ScaleEnum.Ionian]: majorIntervals,
  [ScaleEnum.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  [ScaleEnum.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [ScaleEnum.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [ScaleEnum.DominantLydian]: [2, 2, 2, 1, 2, 1, 2],
  [ScaleEnum.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  [ScaleEnum.Eolian]: minorIntervals,
  [ScaleEnum.MelodicMinor]: [2, 1, 2, 2, 2, 2, 1],
  [ScaleEnum.HarmonicMinor]: [2, 1, 2, 2, 1, 3, 1],
  [ScaleEnum.GypsyMinor]: [2, 1, 3, 1, 1, 3, 1],
  [ScaleEnum.DoubleHarmonicMinor]: [1, 3, 1, 2, 1, 3, 1],
  [ScaleEnum.Locrian]: [1, 2, 2, 1, 2, 2, 2],
  [ScaleEnum.SuperLocrian]: [1, 2, 1, 2, 2, 2, 2],
  // 8 notes scales
  // [ScaleEnum.Bebop]: [2, 2, 1, 2, 1, 1, 2, 1],
  // [ScaleEnum.BebopMinor]: [2, 1, 2, 2, 1, 1, 2, 1],
  // [ScaleEnum.DominantBebop]: [2, 2, 1, 2, 2, 1, 1, 1],
  // [ScaleEnum.HalfWholeDiminished]: [1, 2, 1, 2, 1, 2, 1, 2],
  // [ScaleEnum.WholeHalfDiminished]: [2, 1, 2, 1, 2, 1, 2, 1],
}
