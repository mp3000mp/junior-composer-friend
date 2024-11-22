import { describe, expect, test } from 'vitest'
import {
  generateIntervalsFromCustomQuality,
  generateChordFromModeDegree,
  generateChordFromIntervals,
  generateChordFromCustomQuality,
} from '../chordGenerator'
import { Chord, ChordQuality, ChordStructure } from '@/music/chord/types'
import { ModeEnum, type Degree } from '@/music/scale/types'
import { Interval, type SharpNote } from '@/music/types'

describe('music/chordGenerator.ts', () => {
  const generateChordFromModeDegreeTestCases: {
    modeRoot: SharpNote
    mode: ModeEnum
    degree: Degree
    chordStructure: ChordStructure
    expected: Chord
  }[] = [
    {
      modeRoot: 'C',
      mode: ModeEnum.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: ['C', 'E', 'G'],
    },
    {
      modeRoot: 'A',
      mode: ModeEnum.Eolian,
      degree: 'V',
      chordStructure: ChordStructure.Triad,
      expected: ['E', 'G', 'B'],
    },
  ]
  generateChordFromModeDegreeTestCases.forEach(
    ({ modeRoot, mode, degree, chordStructure, expected }) => {
      test(`generateChordFromModeDegree with ${modeRoot} and ${degree}`, () => {
        const result = generateChordFromModeDegree(modeRoot, mode, degree, chordStructure)
        expect(result).toEqual(expected)
      })
    },
  )

  const generateChordFromIntervalsTestCases: {
    chordRoot: SharpNote
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
    test(`generateChordFromIntervals with ${chordRoot} and [ ${intervals.join(' ')} ]`, () => {
      const result = generateChordFromIntervals(chordRoot, intervals)
      expect(result).toEqual(expected)
    })
  })

  // see https://fr.wikipedia.org/wiki/Chiffrage_des_accords
  const generateChordFromCustomQualityTestCases: {
    customQuality: string
    expected: Chord
  }[] = [
    // invalid
    { customQuality: 'X', expected: [] },
    // power
    { customQuality: 'C5', expected: ['C', 'G'] },
    // triads
    { customQuality: 'C', expected: ['C', 'E', 'G'] },
    { customQuality: 'C#', expected: ['C#', 'F', 'G#'] },
    // { customQuality: 'Bb', expected: ['Bb', 'D', 'F'] }, // todo
    { customQuality: 'Cm', expected: ['C', 'D#', 'G'] },
    { customQuality: 'C-', expected: ['C', 'D#', 'G'] },
    { customQuality: 'Cmin', expected: ['C', 'D#', 'G'] },
    { customQuality: 'C+', expected: ['C', 'E', 'G#'] },
    { customQuality: 'Caug', expected: ['C', 'E', 'G#'] },
    { customQuality: 'C°', expected: ['C', 'D#', 'F#'] },
    { customQuality: 'Co', expected: ['C', 'D#', 'F#'] },
    { customQuality: 'Cdim', expected: ['C', 'D#', 'F#'] },
    { customQuality: 'Csus2', expected: ['C', 'D', 'G'] },
    { customQuality: 'Csus4', expected: ['C', 'F', 'G'] },
    { customQuality: 'Csus', expected: ['C', 'F', 'G'] },
    { customQuality: 'C5add9', expected: ['C', 'G', 'D'] },
    { customQuality: 'Csus2b5', expected: ['C', 'D', 'F#'] },
    { customQuality: 'C7no3', expected: ['C', 'G', 'A#'] }, // pk pas sus7 ?
    // tetrads
    { customQuality: 'CΔ', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CΔ7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'Cmaj7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CM7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CmΔ', expected: ['C', 'D#', 'G', 'B'] },
    { customQuality: 'CmM7', expected: ['C', 'D#', 'G', 'B'] },
    { customQuality: 'C-maj7', expected: ['C', 'D#', 'G', 'B'] },
    { customQuality: 'C7', expected: ['C', 'E', 'G', 'A#'] },
    { customQuality: 'C-7', expected: ['C', 'D#', 'G', 'A#'] },
    { customQuality: 'C+7', expected: ['C', 'E', 'G#', 'A#'] },
    { customQuality: 'Cmin7', expected: ['C', 'D#', 'G', 'A#'] },
    { customQuality: 'Cø', expected: ['C', 'D#', 'F#', 'A#'] },
    { customQuality: 'CØ7', expected: ['C', 'D#', 'F#', 'A#'] },
    { customQuality: 'C°7', expected: ['C', 'D#', 'F#', 'A#'] },
    { customQuality: 'C°maj7', expected: ['C', 'D#', 'F#', 'B'] },
    { customQuality: 'Cm+7', expected: ['C', 'D#', 'G#', 'A#'] },
    { customQuality: 'C+Δ7', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cm7b5', expected: ['C', 'D#', 'F#', 'A#'] },
    { customQuality: 'Cmaj7+5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7#5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7aug5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7-5', expected: ['C', 'E', 'F#', 'B'] },
    { customQuality: 'Cmaj7b5', expected: ['C', 'E', 'F#', 'B'] },
    { customQuality: 'Cmaj7dim5', expected: ['C', 'E', 'F#', 'B'] },
    { customQuality: 'Cmaj7°5', expected: ['C', 'E', 'F#', 'B'] },
    { customQuality: 'C6', expected: ['C', 'E', 'G', 'A'] },
    { customQuality: 'Cm6', expected: ['C', 'D#', 'G', 'A'] },
    { customQuality: 'C2', expected: ['C', 'D', 'E', 'G'] },
    { customQuality: 'C4', expected: ['C', 'E', 'F', 'G'] },
    { customQuality: 'C7sus2', expected: ['C', 'D', 'G', 'A#'] },
    { customQuality: 'C7sus4', expected: ['C', 'F', 'G', 'A#'] },
    { customQuality: 'Cadd2', expected: ['C', 'D', 'E', 'G'] },
    { customQuality: 'Cadd4', expected: ['C', 'E', 'F', 'G'] },
    { customQuality: 'Cadd9', expected: ['C', 'E', 'G', 'D'] },
    // experimental
    { customQuality: 'C6/9', expected: ['C', 'E', 'G', 'A', 'D'] },
    { customQuality: 'C7add2', expected: ['C', 'D', 'E', 'G', 'A#'] },
    { customQuality: 'C7/9', expected: ['C', 'E', 'G', 'A#', 'D'] },
    { customQuality: 'C7add11', expected: ['C', 'E', 'G', 'A#', 'F'] },
    { customQuality: 'C7add13', expected: ['C', 'E', 'G', 'A#', 'A'] },
    { customQuality: 'C9', expected: ['C', 'E', 'G', 'A#', 'D'] },
    { customQuality: 'Cmaj9', expected: ['C', 'E', 'G', 'B', 'D'] },
    { customQuality: 'CΔ9', expected: ['C', 'E', 'G', 'B', 'D'] },
    { customQuality: 'C7b9', expected: ['C', 'E', 'G', 'A#', 'C#'] },
    { customQuality: 'C+M9', expected: ['C', 'E', 'G#', 'B', 'D'] },
    { customQuality: 'C9sus4', expected: ['C', 'F', 'G', 'A#', 'D'] },
    { customQuality: 'C11', expected: ['C', 'E', 'G', 'A#', 'D', 'F'] }, // G optional
    { customQuality: 'Cmaj11', expected: ['C', 'E', 'G', 'B', 'D', 'F'] },
    { customQuality: 'C9#11', expected: ['C', 'E', 'G', 'A#', 'D', 'F#'] },
    { customQuality: 'Cmaj9#11', expected: ['C', 'E', 'G', 'B', 'D', 'F#'] },
    { customQuality: 'C13', expected: ['C', 'E', 'G', 'A#', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'Cmaj13', expected: ['C', 'E', 'G', 'B', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'Cm13b9', expected: ['C', 'D#', 'G', 'A#', 'C#', 'F', 'A'] }, // G,F optional
    { customQuality: 'Cm13+11b9', expected: ['C', 'D#', 'G', 'A#', 'C#', 'F#', 'A'] }, // G optional
    { customQuality: 'C13sus', expected: ['C', 'G', 'A#', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'C13b5', expected: ['C', 'E', 'F#', 'A#', 'D', 'F', 'A'] }, // D,F optional
    { customQuality: 'C11b13', expected: ['C', 'E', 'G', 'A#', 'D', 'F', 'G#'] }, // G,D optional
    { customQuality: 'Cm11b9b13', expected: ['C', 'D#', 'G', 'A#', 'C#', 'F', 'G#'] }, // G optional
  ]
  generateChordFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test(`generateChordFromCustomQuality with ${customQuality}`, () => {
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
    test(`generateIntervalsFromCustomQuality with ${customQuality}`, () => {
      const result = generateIntervalsFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })
})
