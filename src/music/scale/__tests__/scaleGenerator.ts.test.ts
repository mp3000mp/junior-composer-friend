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
    scaleRoot: NaturalNote
    intervals: ScaleIntervals
    expected: Scale
  }[] = [
    {
      scaleRoot: 'A',
      intervals: SCALE_INTERVALS[ScaleEnum.Eolian],
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
    {
      scaleRoot: 'C',
      intervals: SCALE_INTERVALS[ScaleEnum.Lydian],
      expected: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    },
    {
      scaleRoot: 'F',
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    },
    {
      scaleRoot: 'Fb',
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb'],
    },
    {
      scaleRoot: 'G#',
      intervals: SCALE_INTERVALS[ScaleEnum.HarmonicMinor],
      expected: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F##'],
    },
  ]
  generateScaleFromIntervalsTestCases.forEach(({ scaleRoot, intervals, expected }) => {
    test(`generateScaleFromIntervals with ${scaleRoot} [${intervals.join(',')}]`, () => {
      const result = generateScaleFromIntervals(scaleRoot, intervals)
      expect(result).toEqual(expected)
    })
  })
})
