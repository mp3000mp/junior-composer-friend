import { describe, expect, test } from 'vitest'
import { chooseScaleAlteration } from '@/music/scale/utils'
import { type Alteration, type FullChromaticNote } from '@/music/types'
import { SCALE_INTERVALS, ScaleEnum, type ScaleIntervals } from '@/music/scale/types'

describe('music/scale/utils.ts', () => {
  const chooseScaleAlterationTestCases: {
    scaleRoot: FullChromaticNote
    scaleIntervals: ScaleIntervals
    expected: Alteration
  }[] = [
    // {
    //   scaleRoot: 'A#',
    //   scaleIntervals: [],
    //   expected: '#',
    // },
    // {
    //   scaleRoot: 'Ab',
    //   scaleIntervals: [],
    //   expected: 'b',
    // },
    // {
    //   scaleRoot: 'C',
    //   scaleIntervals: [SCALE_INTERVALS.Lydian],
    //   expected: '#',
    // },
    {
      scaleRoot: 'C',
      scaleIntervals: SCALE_INTERVALS[ScaleEnum.Eolian],
      expected: 'b',
    },
  ]
  chooseScaleAlterationTestCases.forEach(({ scaleRoot, expected }) => {
    test(`chooseScaleAlteration with ${scaleRoot}`, () => {
      const result = chooseScaleAlteration(scaleRoot)
      expect(result).toEqual(expected)
    })
  })
})
