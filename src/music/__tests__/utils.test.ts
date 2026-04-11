import { describe, expect, test } from 'vitest'
import {
  computeFrequency,
  transposeChord,
  transposeNote,
  getAlteration,
  noteToString,
} from '@/music/utils'
import { type Alteration, type Note, type NoteLetter } from '@/music/types'
import type { Chord } from '@/music/chord/types'
import { makeNote } from '../../test-utils'

describe('music/utils.ts', () => {
  const computeFrequencyTestCases: { note: Note; octave: number; expected: number }[] = [
    {
      note: makeNote('A'),
      octave: 4,
      expected: 440,
    },
    {
      note: makeNote('A'),
      octave: 5,
      expected: 880,
    },
    {
      note: makeNote('A'),
      octave: 3,
      expected: 220,
    },
    {
      note: makeNote('C'),
      octave: 4,
      expected: 262,
    },
  ]
  computeFrequencyTestCases.forEach(({ note, octave, expected }) => {
    test(`computeFrequency with ${noteToString(note)} ${octave}`, () => {
      const result = computeFrequency(note, octave)
      expect(result).toEqual(expected)
    })
  })

  const getAlterationTestCases: {
    naturalNote: NoteLetter
    intervalFromC: number
    expected: Alteration
  }[] = [
    {
      naturalNote: 'C',
      intervalFromC: 10,
      expected: 'bb',
    },
    {
      naturalNote: 'G',
      intervalFromC: 6,
      expected: 'b',
    },
    {
      naturalNote: 'C',
      intervalFromC: 0,
      expected: '',
    },
    {
      naturalNote: 'C',
      intervalFromC: 1,
      expected: '#',
    },
    {
      naturalNote: 'D',
      intervalFromC: 4,
      expected: '##',
    },
  ]
  getAlterationTestCases.forEach(({ naturalNote, intervalFromC, expected }) => {
    test(`getAlteration with ${naturalNote} and ${intervalFromC}`, () => {
      const result = getAlteration(naturalNote, intervalFromC)
      expect(result).toEqual(expected)
    })
  })

  const transposeNoteTestCases: {
    baseNote: Note
    interval: number
    expected: Note
  }[] = [
    {
      baseNote: makeNote('C'),
      interval: 1,
      expected: makeNote('C', '#'),
    },
    {
      baseNote: makeNote('B'),
      interval: 2,
      expected: makeNote('C', '#'),
    },
    {
      baseNote: makeNote('C', '#'),
      interval: -1,
      expected: makeNote('C'),
    },
    {
      baseNote: makeNote('D', 'b'),
      interval: 1,
      expected: makeNote('D'),
    },
    {
      baseNote: makeNote('C'),
      interval: 25,
      expected: makeNote('C', '#'),
    },
  ]
  transposeNoteTestCases.forEach(({ baseNote, interval, expected }) => {
    test(`transposeNote with ${noteToString(baseNote)} and ${interval}`, () => {
      const result = transposeNote(baseNote, interval)
      expect(result).toEqual(expected)
    })
  })

  const transposeChordTestCases: { chord: Chord; interval: number; expected: Chord }[] = [
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G')],
      interval: 2,
      expected: [makeNote('D'), makeNote('F', '#'), makeNote('A')],
    },
  ]
  transposeChordTestCases.forEach(({ chord, interval, expected }) => {
    test(`transposeChord with [ ${chord.map((note) => noteToString(note)).join(' ')} ] and ${interval}`, () => {
      const result = transposeChord(chord, interval)
      expect(result).toEqual(expected)
    })
  })
})
