import { describe, expect, test } from 'vitest'
import { computeFrequency, noteToString } from '@/music/utils'
import { type Note } from '@/music/types'
import { makeNote } from '../../test-utils'

describe('music/utils.ts', () => {
  const computeFrequencyTestCases: { note: Note; octave: number; expected: number }[] = [
    {
      note: makeNote('A'),
      octave: 4,
      expected: 440,
    },
    {
      note: makeNote('A'),
      octave: 5,
      expected: 880,
    },
    {
      note: makeNote('A'),
      octave: 3,
      expected: 220,
    },
    {
      note: makeNote('C'),
      octave: 4,
      expected: 262,
    },
  ]
  computeFrequencyTestCases.forEach(({ note, octave, expected }) => {
    test(`computeFrequency with ${noteToString(note)} ${octave}`, () => {
      const result = computeFrequency(note, octave)
      expect(result).toEqual(expected)
    })
  })
})
