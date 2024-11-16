import { describe, expect, test } from 'vitest'
import { getEligibleModesFromIntervals } from '../scaleAnalyzer'
import { Mode, ScaleIntervals } from '../types'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleModesFromIntervalsTestCases: { intervals: ScaleIntervals; expected: Mode[] }[] =
    [
      {
        intervals: [1, 1],
        expected: [],
      },
      {
        intervals: [2, 2, 1, 2, 2, 2, 1],
        expected: [Mode.Ionian],
      },
    ]
  getEligibleModesFromIntervalsTestCases.forEach(({ intervals, expected }) => {
    test('getEligibleModesFromIntervals with (' + intervals.join(' '), () => {
      const result = getEligibleModesFromIntervals(intervals)
      expect(result).toEqual(expected)
    })
  })
})
