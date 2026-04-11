import { describe, expect, test } from 'vitest'
import { chooseScaleAlteration } from '@/music/scale/utils'
import { type Alteration, type Note } from '@/music/types'
import { SCALE_INTERVALS, ScaleEnum, type ScaleIntervals } from '@/music/scale/types'
import { noteToString } from '../../utils'
import { makeNote } from '../../../test-utils'

describe('music/scale/utils.ts', () => {
  const chooseScaleAlterationTestCases: {
    scaleRootNote: Note
    scaleIntervals: ScaleIntervals
    expected: Alteration
  }[] = [
    // {
    //   scaleRootNote: makeNote('A', '#'),
    //   scaleIntervals: [],
    //   expected: '#',
    // },
    // {
    //   scaleRootNote: makeNote('A', 'b'),
    //   scaleIntervals: [],
    //   expected: 'b',
    // },
    // {
    //   scaleRootNote: makeNote('C'),
    //   scaleIntervals: [SCALE_INTERVALS.Lydian],
    //   expected: '#',
    // },
    {
      scaleRootNote: makeNote('C'),
      scaleIntervals: SCALE_INTERVALS[ScaleEnum.Eolian],
      expected: 'b',
    },
  ]
  chooseScaleAlterationTestCases.forEach(({ scaleRootNote, expected }) => {
    test(`chooseScaleAlteration with ${noteToString(scaleRootNote)}`, () => {
      const result = chooseScaleAlteration(scaleRootNote)
      expect(result).toEqual(expected)
    })
  })
})
