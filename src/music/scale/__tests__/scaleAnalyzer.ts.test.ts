import { describe, expect, test } from 'vitest'
import { getEligibleModesFromIntervals } from '@/music/scale/scaleAnalyzer'
import { ModeEnum, type ScaleIntervals } from '@/music/scale/types'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleModesFromIntervalsTestCases: {
    intervals: ScaleIntervals
    expected: ModeEnum[]
  }[] = [
    {
      intervals: [1, 1],
      expected: [],
    },
    {
      intervals: [2, 2, 1, 2, 2, 2, 1],
      expected: [ModeEnum.Ionian],
    },
  ]
  getEligibleModesFromIntervalsTestCases.forEach(({ intervals, expected }) => {
    test(`getEligibleModesFromIntervals with [${intervals.join(',')}]`, () => {
      const result = getEligibleModesFromIntervals(intervals)
      expect(result).toEqual(expected)
    })
  })
})
