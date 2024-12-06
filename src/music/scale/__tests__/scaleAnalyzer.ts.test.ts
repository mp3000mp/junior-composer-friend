import { describe, expect, test } from 'vitest'
import { getEligibleScalesFromNotes } from '@/music/scale/scaleAnalyzer'
import { ScaleEnum } from '@/music/scale/types'
import type { FullChromaticNote } from '../../types'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleScalesFromNotesTestCases: {
    notes: FullChromaticNote[]
    expected: ScaleEnum[]
  }[] = [
    {
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
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
      expected: [{ rootScale: 'C', scale: ScaleEnum.HarmonicMinor, similarity: 1 }],
    },
    {
      notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'B'],
      expected: [
        { rootScale: 'C', scale: ScaleEnum.Phrygian, similarity: 0.86 },
        { rootScale: 'C', scale: ScaleEnum.HarmonicMinor, similarity: 0.86 },
        { rootScale: 'C', scale: ScaleEnum.DoubleHarmonicMinor, similarity: 0.86 },
        { rootScale: 'F', scale: ScaleEnum.Eolian, similarity: 0.86 },
        { rootScale: 'F', scale: ScaleEnum.GypsyMinor, similarity: 0.86 },
        { rootScale: 'G', scale: ScaleEnum.Locrian, similarity: 0.86 },
      ],
    },
  ]
  getEligibleScalesFromNotesTestCases.forEach(({ notes, expected }) => {
    test(`getEligibleScalesFromNotes with [${notes.join(',')}]`, () => {
      const result = getEligibleScalesFromNotes(notes)
      expect(result).toEqual(expected)
    })
  })
})
