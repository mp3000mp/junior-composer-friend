import { describe, expect, test } from 'vitest'
import { transposeChord, transposeNote } from '../utils'
import { Chord, Note } from '../types'

describe('music/utils.ts', () => {
  const transposeNoteTestCases: { baseNote: Note; interval: number; expected: Note }[] = [
    {
      baseNote: 'C',
      interval: 1,
      expected: 'C#',
    },
    {
      baseNote: 'B',
      interval: 2,
      expected: 'C#',
    },
    {
      baseNote: 'C#',
      interval: -1,
      expected: 'C',
    },
    {
      baseNote: 'C',
      interval: 25,
      expected: 'C#',
    },
  ]
  transposeNoteTestCases.forEach(({ baseNote, interval, expected }) => {
    test('transposeNote with ' + baseNote + ' and ' + interval, () => {
      const result = transposeNote(baseNote, interval)
      expect(result).toBe(expected)
    })
  })

  const transposeChordTestCases: { chord: Chord; interval: number; expected: Chord }[] = [
    {
      chord: ['C', 'E', 'G'],
      interval: 2,
      expected: ['D', 'F#', 'A'],
    },
  ]
  transposeChordTestCases.forEach(({ chord, interval, expected }) => {
    test('transposeChord with [' + chord.join(' ') + '] and ' + interval, () => {
      const result = transposeChord(chord, interval)
      expect(result).toEqual(expected)
    })
  })
})
