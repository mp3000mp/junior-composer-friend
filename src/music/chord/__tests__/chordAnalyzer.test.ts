import { describe, expect, test } from 'vitest'
import { getEligibleChordQualities } from '@/music/chord/chordAnalyzer'
import { type Chord, ChordQualityEnum } from '@/music/chord/types'
import { makeNote } from '../../../test-utils'

describe('music/chordAnalyzer.ts', () => {
  const getEligibleChordQualitiesTestCases: {
    chord: Chord
    expected: ChordQualityEnum[]
  }[] = [
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G')],
      expected: [ChordQualityEnum.Major],
    },
    {
      chord: [makeNote('A'), makeNote('C'), makeNote('E')],
      expected: [ChordQualityEnum.Minor],
    },
    {
      chord: [makeNote('A'), makeNote('E'), makeNote('G'), makeNote('B')], // second <=> 9th
      expected: [ChordQualityEnum.SeventhSuspendedSecond],
    },
  ]
  getEligibleChordQualitiesTestCases.forEach(({ chord, expected }) => {
    test(`getEligibleChordQualities with ${chord.join(' ')}`, () => {
      const result = getEligibleChordQualities(chord)
      expect(result).toEqual(expected)
    })
  })
})
