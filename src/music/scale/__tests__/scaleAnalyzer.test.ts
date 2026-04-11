import { describe, expect, test } from 'vitest'
import { getEligibleScalesFromNotes } from '@/music/scale/scaleAnalyzer'
import { ScaleEnum } from '@/music/scale/types'
import type { Note } from '../../types'
import { makeNote } from '../../../test-utils'
import { noteToString } from '../../utils'

describe('music/scaleAnalyzer.ts', () => {
  const getEligibleScalesFromNotesTestCases: {
    notes: Note[]
    rootNote: Note | null
    expected: {
      rootScale: Note
      scale: ScaleEnum
      similarity: number
    }[]
  }[] = [
    {
      notes: [
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
        makeNote('F'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B'),
      ],
      rootNote: null,
      expected: [
        { rootScale: makeNote('C'), scale: ScaleEnum.Ionian, similarity: 1 },
        { rootScale: makeNote('D'), scale: ScaleEnum.Dorian, similarity: 1 },
        { rootScale: makeNote('E'), scale: ScaleEnum.Phrygian, similarity: 1 },
        { rootScale: makeNote('F'), scale: ScaleEnum.Lydian, similarity: 1 },
        { rootScale: makeNote('G'), scale: ScaleEnum.Mixolydian, similarity: 1 },
        { rootScale: makeNote('A'), scale: ScaleEnum.Eolian, similarity: 1 },
        { rootScale: makeNote('B'), scale: ScaleEnum.Locrian, similarity: 1 },
      ],
    },
    {
      notes: [
        makeNote('C'),
        makeNote('D'),
        makeNote('E', 'b'),
        makeNote('F'),
        makeNote('G'),
        makeNote('A', 'b'),
        makeNote('B'),
      ],
      rootNote: null,
      expected: [{ rootScale: makeNote('C'), scale: ScaleEnum.HarmonicMinor, similarity: 1 }],
    },
    {
      notes: [
        makeNote('C'),
        makeNote('D', 'b'),
        makeNote('D', 'b'),
        makeNote('E', 'b'),
        makeNote('F'),
        makeNote('G'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B', 'b'),
      ],
      rootNote: makeNote('C'),
      expected: [
        { rootScale: makeNote('C'), scale: ScaleEnum.Phrygian, similarity: 0.89 },
        { rootScale: makeNote('C'), scale: ScaleEnum.Dorian, similarity: 0.78 },
      ],
    },
    {
      notes: [
        makeNote('B', 'b'),
        makeNote('C'),
        makeNote('D', 'b'),
        makeNote('E', 'b'),
        makeNote('F'),
        makeNote('G', 'b'),
        makeNote('A', 'b'),
      ],
      rootNote: makeNote('B', 'b'),
      expected: [{ rootScale: makeNote('B', 'b'), scale: ScaleEnum.Eolian, similarity: 1 }],
    },
    {
      notes: [
        makeNote('E'),
        makeNote('F', '#'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B'),
        makeNote('C'),
        makeNote('D', '#'),
      ],
      rootNote: makeNote('E'),
      expected: [{ rootScale: makeNote('E'), scale: ScaleEnum.HarmonicMinor, similarity: 1 }],
    },
    {
      notes: [
        makeNote('C', 'b'),
        makeNote('D', 'b'),
        makeNote('E', 'bb'),
        makeNote('F', 'b'),
        makeNote('G', 'b'),
        makeNote('A', 'bb'),
        makeNote('B', 'bb'),
      ],
      rootNote: makeNote('C', 'b'),
      expected: [{ rootScale: makeNote('C', 'b'), scale: ScaleEnum.Eolian, similarity: 1 }],
    },
  ]
  getEligibleScalesFromNotesTestCases.forEach(({ notes, rootNote, expected }) => {
    test(`getEligibleScalesFromNotes with [${notes.map((note) => noteToString(note)).join(',')}] and ${rootNote ? noteToString(rootNote) : 'null'}`, () => {
      const result = getEligibleScalesFromNotes(notes, rootNote)
      expect(result).toEqual(expected)
    })
  })
})
