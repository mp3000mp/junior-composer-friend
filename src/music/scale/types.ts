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
  Major = 'major',
  NaturalMinor = 'naturalMinor',
  MelodicMinor = 'melodicMinor',
  HarmonicMinor = 'harmonicMinor',
  Ionian = 'ionian',
  Dorian = 'dorian',
  Phrygian = 'phrygian',
  Lydian = 'lydian',
  Mixolydian = 'mixolydian',
  Eolian = 'eolian',
  Locrian = 'locrian',
}

export const ScaleLabels = {
  [ScaleEnum.Major]: 'major',
  [ScaleEnum.NaturalMinor]: 'minor',
  [ScaleEnum.MelodicMinor]: 'melodic minor',
  [ScaleEnum.HarmonicMinor]: 'harmonic minor',
  [ScaleEnum.Ionian]: 'ionian',
  [ScaleEnum.Dorian]: 'dorian',
  [ScaleEnum.Phrygian]: 'phrygian',
  [ScaleEnum.Lydian]: 'lydian',
  [ScaleEnum.Mixolydian]: 'mixolydian',
  [ScaleEnum.Eolian]: 'eolian',
  [ScaleEnum.Locrian]: 'locrian',
}

const majorIntervals = [2, 2, 1, 2, 2, 2, 1]
const minorIntervals = [2, 1, 2, 2, 1, 2, 2]
export const SCALE_INTERVALS: Record<ScaleEnum, ScaleIntervals> = {
  [ScaleEnum.Major]: majorIntervals,
  [ScaleEnum.NaturalMinor]: minorIntervals,
  [ScaleEnum.MelodicMinor]: [2, 1, 2, 2, 2, 2, 1],
  [ScaleEnum.HarmonicMinor]: [2, 1, 2, 2, 1, 3, 1],
  [ScaleEnum.Ionian]: majorIntervals,
  [ScaleEnum.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  [ScaleEnum.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [ScaleEnum.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [ScaleEnum.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  [ScaleEnum.Eolian]: minorIntervals,
  [ScaleEnum.Locrian]: [1, 2, 2, 1, 2, 2, 2],
}
