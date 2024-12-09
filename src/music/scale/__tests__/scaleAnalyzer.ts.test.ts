import { describe, expect, test } from 'vitest'
import { getEligibleScalesFromNotes } from '@/music/scale/scaleAnalyzer'
import { ScaleEnum } from '@/music/scale/types'
import type { FullChromaticNote } from '../../types'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleScalesFromNotesTestCases: {
    notes: FullChromaticNote[]
    root: FullChromaticNote | null
    expected: ScaleEnum[]
  }[] = [
    {
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      root: null,
      expected: [
        { rootScale: 'C', scale: ScaleEnum.Ionian, similarity: 1 },
        { rootScale: 'D', scale: ScaleEnum.Dorian, similarity: 1 },
        { rootScale: 'E', scale: ScaleEnum.Phrygian, similarity: 1 },
        { rootScale: 'F', scale: ScaleEnum.Lydian, similarity: 1 },
        { rootScale: 'G', scale: ScaleEnum.Mixolydian, similarity: 1 },
        { rootScale: 'A', scale: ScaleEnum.Eolian, similarity: 1 },
        { rootScale: 'B', scale: ScaleEnum.Locrian, similarity: 1 },
      ],
    },
    {
      notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'],
      root: null,
      expected: [{ rootScale: 'C', scale: ScaleEnum.HarmonicMinor, similarity: 1 }],
    },
    {
      notes: ['C', 'Db', 'Db', 'Eb', 'F', 'G', 'G', 'A', 'Bb'],
      root: 'C',
      expected: [
        { rootScale: 'C', scale: ScaleEnum.Phrygian, similarity: 0.89 },
        { rootScale: 'C', scale: ScaleEnum.Dorian, similarity: 0.78 },
      ],
    },
    {
      notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
      root: 'Bb',
      expected: [{ rootScale: 'Bb', scale: ScaleEnum.Eolian, similarity: 1 }],
    },
    {
      notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'],
      root: 'E',
      expected: [{ rootScale: 'E', scale: ScaleEnum.HarmonicMinor, similarity: 1 }],
    },
    {
      notes: ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb'],
      root: 'Cb',
      expected: [{ rootScale: 'Cb', scale: ScaleEnum.Eolian, similarity: 1 }],
    },
  ]
  getEligibleScalesFromNotesTestCases.forEach(({ notes, root, expected }) => {
    test(`getEligibleScalesFromNotes with [${notes.join(',')}] and ${root}`, () => {
      const result = getEligibleScalesFromNotes(notes, root)
      expect(result).toEqual(expected)
    })
  })
})
