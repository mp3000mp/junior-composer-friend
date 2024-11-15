import { describe, expect, test } from 'vitest'
import { getEligibleChordQualities } from '../chordAnalyzer'
import { Chord, ChordQuality } from '../types'

describe('music/chordAnalyzer.ts', () => {
  const getEligibleChordQualitiesTestCases: {
    chord: Chord
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
