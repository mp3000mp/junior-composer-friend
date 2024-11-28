import { describe, expect, test } from 'vitest'
import { getEligibleModesFromIntervals } from '@/music/scale/scaleAnalyzer'
import { ScaleEnum, type ScaleIntervals } from '@/music/scale/types'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleModesFromIntervalsTestCases: {
    intervals: ScaleIntervals
    expected: ScaleEnum[]
  }[] = [
    {
      intervals: [1, 1],
      expected: [],
    },
    {
      intervals: [2, 2, 1, 2, 2, 2, 1],
      expected: [ScaleEnum.Major, ScaleEnum.Ionian],
    },
  ]
  getEligibleModesFromIntervalsTestCases.forEach(({ intervals, expected }) => {
    test(`getEligibleModesFromIntervals with [${intervals.join(',')}]`, () => {
      const result = getEligibleModesFromIntervals(intervals)
      expect(result).toEqual(expected)
    })
  })
})
