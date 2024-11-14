import { describe, expect, test } from 'vitest'
import { getChord, getEligibleChordQualities, transpose } from '../utils'
import { ChordQuality, ChordStructure, Degree, Mode, Note } from '../types'

describe('music/utils.ts', () => {
  const transposeTestCases: { root: Note; interval: number; expected: Note }[] = [
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
  transposeTestCases.forEach(({ root, interval, expected }) => {
    test('transpose with ' + root + ' and ' + interval, () => {
      const result = transpose(root, interval)
      expect(result).toBe(expected)
    })
  })

  const getChordTestCases: {
    root: Note
    mode: Mode
    degree: Degree
    chordStructure: ChordStructure
    expected: Note[]
  }[] = [
    {
      root: 'C',
      mode: Mode.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: ['C', 'E', 'G'],
    },
    {
      root: 'C',
      mode: Mode.Ionian,
      degree: 'VI',
      chordStructure: ChordStructure.Triad,
      expected: ['A', 'C#', 'E'],
    },
  ]
  getChordTestCases.forEach(({ root, mode, degree, chordStructure, expected }) => {
    test('getChord with ' + root + ' and ' + degree, () => {
      const result = getChord(root, mode, degree, chordStructure)
      expect(result).toEqual(expected)
    })
  })

  const getEligibleChordQualitiesTestCases: {
    chord: Note[]
    expected: ChordQuality[]
  }[] = [
    {
      chord: ['C', 'E', 'G'],
      expected: [ChordQuality.Major],
    },
    {
      chord: ['A', 'C', 'E'],
      expected: [ChordQuality.Minor],
    },
    {
      chord: ['A', 'E', 'G', 'B'], // second <=> 9th
      expected: [ChordQuality.SeventhSuspendedSecond],
    },
  ]
  getEligibleChordQualitiesTestCases.forEach(({ chord, expected }) => {
    test('getEligibleChordQualities with ' + chord.join(' '), () => {
      const result = getEligibleChordQualities(chord)
      expect(result).toEqual(expected)
    })
  })
})
