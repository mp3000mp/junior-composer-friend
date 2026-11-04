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
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('A')],
      expected: [ChordQualityEnum.MajorSixth],
    },
    {
      chord: [makeNote('A'), makeNote('C'), makeNote('E'), makeNote('F', '#')],
      expected: [ChordQualityEnum.MinorSixth],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('A'), makeNote('D')],
      expected: [ChordQualityEnum.MajorSixthNinth],
    },
    {
      chord: [
        makeNote('C'),
        makeNote('E', 'b'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
      ],
      expected: [ChordQualityEnum.MinorNinth],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B'), makeNote('D')],
      expected: [ChordQualityEnum.MajorNinth],
    },
    {
      chord: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', 'b'),
      ],
      expected: [ChordQualityEnum.DominantSeventhFlatNinth],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('D')],
      expected: [ChordQualityEnum.AddedNinth],
    },
    {
      chord: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('D')],
      expected: [ChordQualityEnum.MinorAddedNinth],
    },
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('F')],
      expected: [ChordQualityEnum.AddedEleventh],
    },
    {
      chord: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('F')],
      expected: [ChordQualityEnum.MinorAddedEleventh],
    },
    {
      chord: [
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
      ],
      expected: [ChordQualityEnum.MinorEleventh],
    },
    {
      chord: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F', '#'),
      ],
      expected: [ChordQualityEnum.AugmentedEleventh],
    },
    {
      chord: [makeNote('G'), makeNote('B'), makeNote('D'), makeNote('F'), makeNote('A')],
      expected: [ChordQualityEnum.DominantNinth],
    },
    {
      chord: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
      ],
      expected: [ChordQualityEnum.DominantEleventh],
    },
    {
      chord: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
      expected: [ChordQualityEnum.DominantThirteenth],
    },
    {
      chord: [
        makeNote('A'),
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B'),
        makeNote('D'),
        makeNote('F', '#'),
      ],
      expected: [ChordQualityEnum.MinorThirteenth],
    },
  ]
  getEligibleChordQualitiesTestCases.forEach(({ chord, expected }) => {
    test(`getEligibleChordQualities with ${chord.join(' ')}`, () => {
      const result = getEligibleChordQualities(chord)
      expect(result).toEqual(expected)
    })
  })
})
