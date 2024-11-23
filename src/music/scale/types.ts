import type { FullChromaticNote } from '@/music/types'

export type NaturalDegree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'
export type FullChromaticDegree = 'I' | 'IIb' | 'II' | 'IIIb' | 'III' | 'IV' | 'IV#' | 'Vb' | 'V' | 'V#' | 'VIb' | 'VI' | 'VIIb' | 'VII'

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
  HarmonicMinor = 'harmonicMinor',
  Major = 'major',
  MelodicMinor = 'melodicMinor',
  NaturalMinor = 'naturalMinor',
}

export const SCALE_INTERVALS: Record<ScaleEnum, ScaleIntervals> = {
  [ScaleEnum.HarmonicMinor]: [2, 1, 2, 2, 1, 3, 1],
  [ScaleEnum.Major]: [2, 2, 1, 2, 2, 2, 1],
  [ScaleEnum.MelodicMinor]: [2, 1, 2, 2, 2, 2, 1],
  [ScaleEnum.NaturalMinor]: [2, 1, 2, 2, 1, 2, 2],
}

export enum ModeEnum {
  Ionian = 'Ionian',
  Dorian = 'Dorian',
  Phrygian = 'Phrygian',
  Lydian = 'Lydian',
  Mixolydian = 'Mixolydian',
  Eolian = 'Eolian',
  Locrian = 'Locrian',
}

export const MODE_INTERVALS: Record<ModeEnum, ScaleIntervals> = {
  [ModeEnum.Ionian]: SCALE_INTERVALS[ScaleEnum.Major],
  [ModeEnum.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  [ModeEnum.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [ModeEnum.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [ModeEnum.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  [ModeEnum.Eolian]: SCALE_INTERVALS[ScaleEnum.NaturalMinor],
  [ModeEnum.Locrian]: [1, 2, 2, 1, 2, 2, 2],
}
