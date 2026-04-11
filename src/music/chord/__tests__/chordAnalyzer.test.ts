import { describe, expect, test } from 'vitest'
import { getEligibleChordQualities } from '@/music/chord/chordAnalyzer'
import { type Chord, ChordQuality } from '@/music/chord/types'
import { makeNote } from '../../../test-utils'

describe('music/chordAnalyzer.ts', () => {
  const getEligibleChordQualitiesTestCases: {
    chord: Chord
    expected: ChordQuality[]
  }[] = [
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G')],
      expected: [ChordQuality.Major],
    },
    {
      chord: [makeNote('A'), makeNote('C'), makeNote('E')],
      expected: [ChordQuality.Minor],
    },
    {
      chord: [makeNote('A'), makeNote('E'), makeNote('G'), makeNote('B')], // second <=> 9th
      expected: [ChordQuality.SeventhSuspendedSecond],
    },
  ]
  getEligibleChordQualitiesTestCases.forEach(({ chord, expected }) => {
    test(`getEligibleChordQualities with ${chord.join(' ')}`, () => {
      const result = getEligibleChordQualities(chord)
      expect(result).toEqual(expected)
    })
  })
})
