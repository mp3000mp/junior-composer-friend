import { describe, expect, test } from 'vitest'
import { transposeChord, transposeNote } from '../utils'
import { Chord, Note } from '../types'

describe('music/utils.ts', () => {
  const transposeNoteTestCases: { root: Note; interval: number; expected: Note }[] = [
    {
      root: 'C',
      interval: 1,
      expected: 'C#',
    },
    {
      root: 'B',
      interval: 2,
      expected: 'C#',
    },
    {
      root: 'C#',
      interval: -1,
      expected: 'C',
    },
    {
      root: 'C',
      interval: 25,
      expected: 'C#',
    },
  ]
  transposeNoteTestCases.forEach(({ root, interval, expected }) => {
    test('transposeNote with ' + root + ' and ' + interval, () => {
      const result = transposeNote(root, interval)
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
