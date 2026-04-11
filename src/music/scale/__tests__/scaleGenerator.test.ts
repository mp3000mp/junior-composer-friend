import { describe, expect, test } from 'vitest'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import type { Note } from '@/music/types'
import { ScaleEnum, type Scale, type ScaleIntervals, SCALE_INTERVALS } from '@/music/scale/types'
import { makeNote } from '../../../test-utils'
import { noteToString } from '../../utils'

describe('music/scaleGenerator.ts', () => {
  const generateScaleFromIntervalsTestCases: {
    scaleRoot: Note
    intervals: ScaleIntervals
    expected: Scale
  }[] = [
    {
      scaleRoot: makeNote('A'),
      intervals: SCALE_INTERVALS[ScaleEnum.Eolian],
      expected: [
        makeNote('A'),
        makeNote('B'),
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
        makeNote('F'),
        makeNote('G'),
      ],
    },
    {
      scaleRoot: makeNote('C'),
      intervals: SCALE_INTERVALS[ScaleEnum.Lydian],
      expected: [
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
        makeNote('F', '#'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B'),
      ],
    },
    {
      scaleRoot: makeNote('F'),
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: [
        makeNote('F'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B', 'b'),
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
      ],
    },
    {
      scaleRoot: makeNote('F', 'b'),
      intervals: SCALE_INTERVALS[ScaleEnum.Ionian],
      expected: [
        makeNote('F', 'b'),
        makeNote('G', 'b'),
        makeNote('A', 'b'),
        makeNote('B', 'bb'),
        makeNote('C', 'b'),
        makeNote('D', 'b'),
        makeNote('E', 'b'),
      ],
    },
    {
      scaleRoot: makeNote('G', '#'),
      intervals: SCALE_INTERVALS[ScaleEnum.HarmonicMinor],
      expected: [
        makeNote('G', '#'),
        makeNote('A', '#'),
        makeNote('B'),
        makeNote('C', '#'),
        makeNote('D', '#'),
        makeNote('E'),
        makeNote('F', '##'),
      ],
    },
  ]
  generateScaleFromIntervalsTestCases.forEach(({ scaleRoot, intervals, expected }) => {
    test(`generateScaleFromIntervals with ${noteToString(scaleRoot)} [${intervals.join(',')}]`, () => {
      const result = generateScaleFromIntervals(scaleRoot, intervals)
      expect(result).toEqual(expected)
    })
  })
})
