import { describe, expect, test } from 'vitest'
import {
  generateIntervalsFromCustomQuality,
  generateChordFromModeDegree,
  getEligibleChordQualities,
  transposeChord,
  transposeNote,
  generateChordFromIntervals,
  generateChordFromCustomQuality,
} from '../utils'
import { Chord, ChordQuality, ChordStructure, Degree, Interval, Mode, Note } from '../types'

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
      root: 'C',
      mode: Mode.Ionian,
      degree: 'VI',
      chordStructure: ChordStructure.Triad,
      expected: ['A', 'C#', 'E'],
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
      customQuality: '',
      expected: ['C', 'E', 'G'],
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
      customQuality: '#5b9',
      expected: ['C', 'G#', 'C#'],
    },
    {
      root: 'C',
      customQuality: '6/9',
      expected: ['C', 'E', 'G', 'A', 'D'],
    },
  ]
  generateChordFromCustomQualityTestCases.forEach(({ root, customQuality, expected }) => {
    test('generateChordFromCustomQuality with ' + root + ' and ' + customQuality, () => {
      const result = generateChordFromCustomQuality(root, customQuality)
      expect(result).toEqual(expected)
    })
  })

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
