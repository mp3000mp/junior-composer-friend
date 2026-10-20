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
    {
      chord: [makeNote('B'), makeNote('D'), makeNote('F')],
      expected: [ChordQualityEnum.Diminished],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G', '#')],
      expected: [ChordQualityEnum.Augmented],
    },
    {
      chord: [makeNote('B'), makeNote('D'), makeNote('F', '#'), makeNote('A', '#')],
      expected: [ChordQualityEnum.MinorMajorSeventh],
    },
    {
      chord: [makeNote('D'), makeNote('F', '#'), makeNote('A', '#'), makeNote('C', '#')],
      expected: [ChordQualityEnum.AugmentedMajorSeventh],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B', 'b')],
      expected: [ChordQualityEnum.AugmentedSeventh],
    },
    {
      chord: [makeNote('G', '#'), makeNote('B'), makeNote('D'), makeNote('F')],
      expected: [ChordQualityEnum.DiminishedSeventh],
    },
  ]
  getEligibleChordQualitiesTestCases.forEach(({ chord, expected }) => {
    test(`getEligibleChordQualities with ${chord.join(' ')}`, () => {
      const result = getEligibleChordQualities(chord)
      expect(result).toEqual(expected)
    })
  })
})
