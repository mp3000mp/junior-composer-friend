import { describe, expect, test } from 'vitest'
import { chordToMidi, noteAreEquals, noteToString } from '@/music/utils'
import { type Note } from '@/music/types'
import { makeNote } from '../../test-utils'

describe('music/utils.ts', () => {
  const noteAreEqualsTestCases: { noteA: Note; noteB: Note; expected: boolean }[] = [
    { noteA: makeNote('C', '#'), noteB: makeNote('D', 'b'), expected: true },
    { noteA: makeNote('C', 'b'), noteB: makeNote('B'), expected: true },
    { noteA: makeNote('B', '#'), noteB: makeNote('C'), expected: true },
    { noteA: makeNote('C', 'bb'), noteB: makeNote('B', 'b'), expected: true },
    { noteA: makeNote('B', '##'), noteB: makeNote('C', '#'), expected: true },
    { noteA: makeNote('C', 'b'), noteB: makeNote('C'), expected: false },
    { noteA: makeNote('B', '#'), noteB: makeNote('B'), expected: false },
  ]
  noteAreEqualsTestCases.forEach(({ noteA, noteB, expected }) => {
    test(`noteAreEquals with ${noteToString(noteA)} and ${noteToString(noteB)}`, () => {
      expect(noteAreEquals(noteA, noteB)).toBe(expected)
    })
  })

  const chordToMidiTestCases: { label: string; chord: Note[]; expected: number[] }[] = [
    {
      label: 'C E G',
      chord: [makeNote('C'), makeNote('E'), makeNote('G')],
      expected: [60, 64, 67],
    },
    {
      label: 'A C E',
      chord: [makeNote('A'), makeNote('C'), makeNote('E')],
      expected: [69, 72, 76],
    },
    {
      label: 'Ab Cb Eb',
      chord: [makeNote('A', 'b'), makeNote('C', 'b'), makeNote('E', 'b')],
      expected: [68, 71, 75],
    },
    {
      label: 'Cb Eb Gb',
      chord: [makeNote('C', 'b'), makeNote('E', 'b'), makeNote('G', 'b')],
      expected: [59, 63, 66],
    },
    {
      label: 'G# B# D#',
      chord: [makeNote('G', '#'), makeNote('B', '#'), makeNote('D', '#')],
      expected: [68, 72, 75],
    },
    {
      label: 'C E G B D F A (13th fits the keyboard)',
      chord: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
      expected: [60, 64, 67, 71, 74, 77, 81],
    },
    {
      label: 'B D# F# A C# E G# (13th moved one octave down)',
      chord: [
        makeNote('B'),
        makeNote('D', '#'),
        makeNote('F', '#'),
        makeNote('A'),
        makeNote('C', '#'),
        makeNote('E'),
        makeNote('G', '#'),
      ],
      expected: [59, 63, 66, 69, 73, 76, 80],
    },
    { label: 'empty', chord: [], expected: [] },
  ]
  chordToMidiTestCases.forEach(({ label, chord, expected }) => {
    test(`chordToMidi with ${label}`, () => {
      expect(chordToMidi(chord)).toEqual(expected)
    })
  })
})
