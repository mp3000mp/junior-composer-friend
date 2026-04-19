import type { Note } from '@/music/types'

export type NaturalDegree = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII'
export const ORDERED_DEGREES: NaturalDegree[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

export type Scale = Note[]

export type Interval = 1 | 2 | 3
export type ScaleIntervals = Interval[]

export enum ScaleEnum {
  // Natural major family (modes I–VII)
  Ionian = 'ionian',
  Dorian = 'dorian',
  Phrygian = 'phrygian',
  Lydian = 'lydian',
  Mixolydian = 'mixolydian',
  Eolian = 'eolian',
  Locrian = 'locrian',
  // Harmonic minor family (modes I–VII)
  HarmonicMinor = 'harmonicMinor',
  LocrianSharp6 = 'locrianSharp6',
  IonianSharp5 = 'ionianSharp5',
  DorianSharp4 = 'dorianSharp4',
  PhrygianDominant = 'phrygianDominant',
  LydianSharp2 = 'lydianSharp2',
  Ultralocrian = 'ultralocrian',
  // Melodic minor family (modes I–VII)
  MelodicMinor = 'melodicMinor',
  DorianB2 = 'dorianB2',
  LydianAugmented = 'lydianAugmented',
  LydianB7 = 'lydianB7',
  MixolydianB6 = 'mixolydianB6',
  LocrianSharp2 = 'locrianSharp2',
  SuperLocrian = 'superLocrian',
  // Other exotic scales with 7 notes
  GypsyMinor = 'gypsyMinor',
  DoubleHarmonicMinor = 'doubleHarmonicMinor',
  NeapolitanMinor = 'neapolitanMinor',
  NeapolitanMajor = 'neapolitanMajor',
  Persian = 'persian',
  Enigmatic = 'enigmatic',
}

export const ScaleLabels: Record<ScaleEnum, string> = {
  [ScaleEnum.Ionian]: 'ionian',
  [ScaleEnum.Dorian]: 'dorian',
  [ScaleEnum.Phrygian]: 'phrygian',
  [ScaleEnum.Lydian]: 'lydian',
  [ScaleEnum.Mixolydian]: 'mixolydian',
  [ScaleEnum.Eolian]: 'eolian',
  [ScaleEnum.Locrian]: 'locrian',
  [ScaleEnum.HarmonicMinor]: 'harmonic minor [harmo I]',
  [ScaleEnum.LocrianSharp6]: 'locrian #6 [harmo II]',
  [ScaleEnum.IonianSharp5]: 'ionian #5 [harmo III]',
  [ScaleEnum.DorianSharp4]: 'dorian #4 [harmo IV]',
  [ScaleEnum.PhrygianDominant]: 'phrygian dominant [harmo V]',
  [ScaleEnum.LydianSharp2]: 'lydian #2 [harmo VI]',
  [ScaleEnum.Ultralocrian]: 'ultralocrian [harmo VII]',
  [ScaleEnum.MelodicMinor]: 'melodic minor [mélo I]',
  [ScaleEnum.DorianB2]: 'dorian b2 [mélo II]',
  [ScaleEnum.LydianAugmented]: 'lydian augmented [mélo III]',
  [ScaleEnum.LydianB7]: 'lydian b7 [mélo IV]',
  [ScaleEnum.MixolydianB6]: 'mixolydian b6 [mélo V]',
  [ScaleEnum.LocrianSharp2]: 'locrian #2 [mélo VI]',
  [ScaleEnum.SuperLocrian]: 'super locrian [mélo VII]',
  [ScaleEnum.GypsyMinor]: 'gypsy minor',
  [ScaleEnum.DoubleHarmonicMinor]: 'double harmonic minor',
  [ScaleEnum.NeapolitanMinor]: 'neapolitan minor',
  [ScaleEnum.NeapolitanMajor]: 'neapolitan major',
  [ScaleEnum.Persian]: 'persian',
  [ScaleEnum.Enigmatic]: 'enigmatic (Verdi)',
}

export const SCALE_INTERVALS: Record<ScaleEnum, ScaleIntervals> = {
  // Natural major family
  [ScaleEnum.Ionian]: [2, 2, 1, 2, 2, 2, 1],
  [ScaleEnum.Dorian]: [2, 1, 2, 2, 2, 1, 2],
  [ScaleEnum.Phrygian]: [1, 2, 2, 2, 1, 2, 2],
  [ScaleEnum.Lydian]: [2, 2, 2, 1, 2, 2, 1],
  [ScaleEnum.Mixolydian]: [2, 2, 1, 2, 2, 1, 2],
  [ScaleEnum.Eolian]: [2, 1, 2, 2, 1, 2, 2],
  [ScaleEnum.Locrian]: [1, 2, 2, 1, 2, 2, 2],
  // Harmonic minor family
  [ScaleEnum.HarmonicMinor]: [2, 1, 2, 2, 1, 3, 1],
  [ScaleEnum.LocrianSharp6]: [1, 2, 2, 1, 3, 1, 2],
  [ScaleEnum.IonianSharp5]: [2, 2, 1, 3, 1, 2, 1],
  [ScaleEnum.DorianSharp4]: [2, 1, 3, 1, 2, 1, 2],
  [ScaleEnum.PhrygianDominant]: [1, 3, 1, 2, 1, 2, 2],
  [ScaleEnum.LydianSharp2]: [3, 1, 2, 1, 2, 2, 1],
  [ScaleEnum.Ultralocrian]: [1, 2, 1, 2, 2, 1, 3],
  // Melodic minor family
  [ScaleEnum.MelodicMinor]: [2, 1, 2, 2, 2, 2, 1],
  [ScaleEnum.DorianB2]: [1, 2, 2, 2, 2, 1, 2],
  [ScaleEnum.LydianAugmented]: [2, 2, 2, 2, 1, 2, 1],
  [ScaleEnum.LydianB7]: [2, 2, 2, 1, 2, 1, 2],
  [ScaleEnum.MixolydianB6]: [2, 2, 1, 2, 1, 2, 2],
  [ScaleEnum.LocrianSharp2]: [2, 1, 2, 1, 2, 2, 2],
  [ScaleEnum.SuperLocrian]: [1, 2, 1, 2, 2, 2, 2],
  // Other exotic scales
  [ScaleEnum.GypsyMinor]: [2, 1, 3, 1, 1, 3, 1],
  [ScaleEnum.DoubleHarmonicMinor]: [1, 3, 1, 2, 1, 3, 1],
  [ScaleEnum.NeapolitanMinor]: [1, 2, 2, 2, 1, 3, 1],
  [ScaleEnum.NeapolitanMajor]: [1, 2, 2, 2, 2, 1, 2],
  [ScaleEnum.Persian]: [1, 3, 1, 1, 2, 3, 1],
  [ScaleEnum.Enigmatic]: [1, 3, 2, 2, 2, 1, 1],
}
