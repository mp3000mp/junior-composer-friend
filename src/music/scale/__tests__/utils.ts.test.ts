import { describe, expect, test } from 'vitest'
import { chooseScaleAlteration } from '@/music/scale/utils'
import { Alteration, FullChromaticNote } from '@/music/types'
import { SCALE_INTERVALS, ScaleIntervals } from '@/music/scale/types'

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
      scaleIntervals: [SCALE_INTERVALS.Eolian],
      expected: 'b',
    },
  ]
  chooseScaleAlterationTestCases.forEach(({ scaleRoot, scaleIntervals, expected }) => {
    test(`chooseScaleAlteration with ${scaleRoot} [${scaleIntervals.join(',')}]`, () => {
      const result = chooseScaleAlteration(scaleRoot, scaleIntervals)
      expect(result).toEqual(expected)
    })
  })
})
