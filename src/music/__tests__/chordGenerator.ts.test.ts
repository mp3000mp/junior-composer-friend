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
    root: Note
    mode: Mode
    degree: Degree
    chordStructure: ChordStructure
    expected: Chord
  }[] = [
    {
      root: 'C',
      mode: Mode.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: ['C', 'E', 'G'],
    },
    {
      root: 'A',
      mode: Mode.Aeolian,
      degree: 'V',
      chordStructure: ChordStructure.Triad,
      expected: ['E', 'G', 'B'],
    },
  ]
  generateChordFromModeDegreeTestCases.forEach(
    ({ root, mode, degree, chordStructure, expected }) => {
      test('generateChordFromModeDegree with ' + root + ' and ' + degree, () => {
        const result = generateChordFromModeDegree(root, mode, degree, chordStructure)
        expect(result).toEqual(expected)
      })
    },
  )

  const generateChordFromIntervalsTestCases: {
    root: Note
    intervals: Interval[]
    expected: Chord
  }[] = [
    {
      root: 'C',
      intervals: [0, 4, 7],
      expected: ['C', 'E', 'G'],
    },
  ]
  generateChordFromIntervalsTestCases.forEach(({ root, intervals, expected }) => {
    test('generateChordFromIntervals with ' + root + ' and [' + intervals.join(' ') + ']', () => {
      const result = generateChordFromIntervals(root, intervals)
      expect(result).toEqual(expected)
    })
  })

  const generateChordFromCustomQualityTestCases: {
    root: Note
    customQuality: string
    expected: Chord
  }[] = [
    {
      root: 'C',
      customQuality: 'sus2b5',
      expected: ['C', 'D', 'F#'],
    },
    {
      root: 'C',
      customQuality: 'sus4',
      expected: ['C', 'F', 'G'],
    },
    {
      root: 'C',
      customQuality: 'm6',
      expected: ['C', 'D#', 'G', 'A'],
    },
    {
      root: 'C',
      customQuality: 'm7',
      expected: ['C', 'D#', 'G', 'A#'],
    },
    {
      root: 'C',
      customQuality: 'maj7',
      expected: ['C', 'E', 'G', 'B'],
    },
    {
      root: 'C',
      customQuality: '#5b9',
      expected: ['C', 'G#', 'C#'],
    },
    {
      root: 'C',
      customQuality: '6/9',
      expected: ['C', 'E', 'G', 'A', 'D'],
    },
    {
      root: 'C',
      customQuality: '#11',
      expected: ['C', 'E', 'G', 'F#'],
    },
    {
      root: 'C',
      customQuality: '13',
      expected: ['C', 'E', 'G', 'A'],
    },
  ]
  generateChordFromCustomQualityTestCases.forEach(({ root, customQuality, expected }) => {
    test('generateChordFromCustomQuality with ' + root + ' and ' + customQuality, () => {
      const result = generateChordFromCustomQuality(root, customQuality)
      expect(result).toEqual(expected)
    })
  })

  const generateIntervalsFromCustomQualityTestCases: {
    root: Note
    customQuality: string
    expected: ChordQuality[]
  }[] = [
    {
      root: 'C',
      customQuality: 'm',
      expected: [Interval.Tonic, Interval.MinorThird, Interval.Fifth],
    },
  ]
  generateIntervalsFromCustomQualityTestCases.forEach(({ root, customQuality, expected }) => {
    test('generateIntervalsFromCustomQuality with ' + root + customQuality, () => {
      const result = generateIntervalsFromCustomQuality(root, customQuality)
      expect(result).toEqual(expected)
    })
  })
})
