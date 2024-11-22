import type { FullChromaticNote } from '@/music/types'

export type Degree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'
export type Scale = FullChromaticNote[]
export type Interval = 1 | 2 | 3
export type ScaleIntervals = Interval[]

export const ORDERED_DEGREES: Degree[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

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
