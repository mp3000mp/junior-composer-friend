import { describe, expect, test } from 'vitest'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { NaturalNote } from '@/music/types'
import {
  ScaleEnum,
  type Scale,
  ScaleIntervals,
  SCALE_INTERVALS,
  SCALE_INTERVALS,
  ScaleEnum,
} from '@/music/scale/types'

describe('music/scaleGenerator.ts', () => {
  const generateScaleFromIntervalsTestCases: {
    modeRoot: NaturalNote
    intervals: ScaleIntervals
    expected: Scale
  }[] = [
    {
      modeRoot: 'A',
      intervals: SCALE_INTERVALS[ScaleEnum.Eolian],
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
    {
      modeRoot: 'C',
      intervals: SCALE_INTERVALS[ScaleEnum.Lydian],
      expected: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    },
    {
      modeRoot: 'F',
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    },
    {
      modeRoot: 'Fb',
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb'],
    },
    {
      modeRoot: 'G#',
      intervals: SCALE_INTERVALS[ScaleEnum.HarmonicMinor],
      expected: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F##'],
    },
  ]
  generateScaleFromIntervalsTestCases.forEach(({ modeRoot, intervals, expected }) => {
    test(`generateScaleFromIntervals with ${modeRoot} [${intervals.join(',')}]`, () => {
      const result = generateScaleFromIntervals(modeRoot, intervals)
      expect(result).toEqual(expected)
    })
  })
})
