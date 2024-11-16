import { describe, expect, test } from 'vitest'
import {
  generateIntervalsFromCustomQuality,
  generateChordFromModeDegree,
  generateChordFromIntervals,
  generateChordFromCustomQuality,
} from '../chordGenerator'
import { Chord, ChordQuality, ChordStructure, Degree, Interval, Mode, Note } from '../types'

describe('music/chordGenerator.ts', () => {
  const generateChordFromModeDegreeTestCases: {
    modeRoot: Note
    mode: Mode
    degree: Degree
    chordStructure: ChordStructure
    expected: Chord
  }[] = [
    {
      modeRoot: 'C',
      mode: Mode.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: ['C', 'E', 'G'],
    },
    {
      modeRoot: 'A',
      mode: Mode.Aeolian,
      degree: 'V',
      chordStructure: ChordStructure.Triad,
      expected: ['E', 'G', 'B'],
    },
  ]
  generateChordFromModeDegreeTestCases.forEach(
    ({ modeRoot, mode, degree, chordStructure, expected }) => {
      test('generateChordFromModeDegree with ' + modeRoot + ' and ' + degree, () => {
        const result = generateChordFromModeDegree(modeRoot, mode, degree, chordStructure)
        expect(result).toEqual(expected)
      })
    },
  )

  const generateChordFromIntervalsTestCases: {
    chordRoot: Note
    intervals: Interval[]
    expected: Chord
  }[] = [
    {
      chordRoot: 'C',
      intervals: [0, 4, 7],
      expected: ['C', 'E', 'G'],
    },
  ]
  generateChordFromIntervalsTestCases.forEach(({ chordRoot, intervals, expected }) => {
    test(
      'generateChordFromIntervals with ' + chordRoot + ' and [' + intervals.join(' ') + ']',
      () => {
        const result = generateChordFromIntervals(chordRoot, intervals)
        expect(result).toEqual(expected)
      },
    )
  })

  const generateChordFromCustomQualityTestCases: {
    customQuality: string
    expected: Chord
  }[] = [
    {
      customQuality: 'Csus2b5',
      expected: ['C', 'D', 'F#'],
    },
    {
      customQuality: 'Csus4',
      expected: ['C', 'F', 'G'],
    },
    {
      customQuality: 'Cm6',
      expected: ['C', 'D#', 'G', 'A'],
    },
    {
      customQuality: 'Cm7',
      expected: ['C', 'D#', 'G', 'A#'],
    },
    {
      customQuality: 'Cmaj7',
      expected: ['C', 'E', 'G', 'B'],
    },
    {
      customQuality: 'C#5b9',
      expected: ['C', 'G#', 'C#'],
    },
    {
      customQuality: 'C6/9',
      expected: ['C', 'E', 'G', 'A', 'D'],
    },
    {
      customQuality: 'C#11',
      expected: ['C', 'E', 'G', 'F#'],
    },
    {
      customQuality: 'C13',
      expected: ['C', 'E', 'G', 'A'],
    },
  ]
  generateChordFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test('generateChordFromCustomQuality with ' + customQuality, () => {
      const result = generateChordFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })

  const generateIntervalsFromCustomQualityTestCases: {
    customQuality: string
    expected: ChordQuality[]
  }[] = [
    {
      customQuality: 'm',
      expected: [Interval.Tonic, Interval.MinorThird, Interval.Fifth],
    },
  ]
  generateIntervalsFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test('generateIntervalsFromCustomQuality with ' + customQuality, () => {
      const result = generateIntervalsFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })
})
