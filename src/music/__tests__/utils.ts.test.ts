import { describe, expect, test } from 'vitest'
import { computeFrequency, getSharpNote, getFullChromaticNote, transposeChord, transposeNote } from '../utils'
import { Chord, FullChromaticNote, SharpNote } from '../types'

describe('music/utils.ts', () => {
  const computeFrequencyTestCases: { note: SharpNote; octave: number; expected: number }[] = [
    {
      note: 'A',
      octave: 4,
      expected: 440,
    },
    {
      note: 'A',
      octave: 5,
      expected: 880,
    },
    {
      note: 'A',
      octave: 3,
      expected: 220,
    },
    {
      note: 'C',
      octave: 4,
      expected: 262,
    },
  ]
  computeFrequencyTestCases.forEach(({ note, octave, expected }) => {
    test('computeFrequency with ' + note + octave, () => {
      const result = computeFrequency(note, octave)
      expect(result).toEqual(expected)
    })
  })

  const getFullChromaticNoteTestCases: { scaleRoot: SharpNote, note: SharpNote, expected: SharpNote }[] = [
    {
      scaleRoot: 'C',
      note: 'C',
      expected: 'C',
    },
    {
      scaleRoot: 'C',
      note: 'A#',
      expected: 'Bb',
    },
    {
      scaleRoot: 'C#',
      note: 'C#',
      expected: 'C#',
    },
    {
      scaleRoot: 'C#',
      note: 'D#',
      expected: 'D#',
    },
  ]
  getFullChromaticNoteTestCases.forEach(({ scaleRoot, note, expected }) => {
    test('getFullChromaticNote with ' + scaleRoot + ' ' + note, () => {
      const result = getFullChromaticNote(scaleRoot, note)
      expect(result).toEqual(expected)
    })
  })

  const getSharpNoteTestCases: { note: FullChromaticNote; expected: SharpNote }[] = [
    {
      note: 'C',
      expected: 'C',
    },
    {
      note: 'C#',
      expected: 'C#',
    },
    {
      note: 'Db',
      expected: 'C#',
    },
  ]
  getSharpNoteTestCases.forEach(({ note, expected }) => {
    test('getSharpNote with ' + note, () => {
      const result = getSharpNote(note)
      expect(result).toEqual(expected)
    })
  })

  const transposeNoteTestCases: { baseNote: SharpNote; interval: number; expected: SharpNote }[] = [
    {
      baseNote: 'C',
      interval: 1,
      expected: 'C#',
    },
    {
      baseNote: 'B',
      interval: 2,
      expected: 'C#',
    },
    {
      baseNote: 'C#',
      interval: -1,
      expected: 'C',
    },
    {
      baseNote: 'C',
      interval: 25,
      expected: 'C#',
    },
  ]
  transposeNoteTestCases.forEach(({ baseNote, interval, expected }) => {
    test('transposeNote with ' + baseNote + ' and ' + interval, () => {
      const result = transposeNote(baseNote, interval)
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
})
