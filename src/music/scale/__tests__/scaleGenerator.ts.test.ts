import { describe, expect, test } from 'vitest'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { NaturalNote } from '@/music/types'
import {
  ModeEnum,
  type Scale,
  ScaleIntervals,
  MODE_INTERVALS,
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
      intervals: MODE_INTERVALS[ModeEnum.Eolian],
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
    {
      modeRoot: 'C',
      intervals: MODE_INTERVALS[ModeEnum.Lydian],
      expected: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    },
    {
      modeRoot: 'F',
      intervals: MODE_INTERVALS[ModeEnum.Ionian],
      expected: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    },
    {
      modeRoot: 'Fb',
      intervals: MODE_INTERVALS[ModeEnum.Ionian],
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
