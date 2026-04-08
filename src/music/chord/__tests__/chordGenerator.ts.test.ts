import { describe, expect, test } from 'vitest'
import {
  generateChromaticDegreesFromCustomQuality,
  generateChordFromScaleDegree,
  generateChordFromDegrees,
  generateChordFromCustomQuality,
  getChromaticNoteFromDegree,
  generateTritonicSubstitution,
  getScaleInterval,
} from '../chordGenerator'
import { type Chord, ChordStructure } from '@/music/chord/types'
import {
  type FullChromaticDegree,
  ScaleEnum,
  type NaturalDegree,
  type ScaleIntervals,
} from '@/music/scale/types'
import { type FullChromaticNote, type SharpNote } from '@/music/types'

describe('music/chordGenerator.ts', () => {
  const getScaleIntervalTestCases: {
    scaleIntervals: ScaleIntervals
    fromIndex: number
    toIndex: number
    expected: number
  }[] = [
    {
      scaleIntervals: [2, 2, 1],
      fromIndex: 0,
      toIndex: 1,
      expected: 2,
    },
    {
      scaleIntervals: [2, 2, 1],
      fromIndex: 2,
      toIndex: 0,
      expected: 1,
    },
  ]
  getScaleIntervalTestCases.forEach(({ scaleIntervals, fromIndex, toIndex, expected }) => {
    test(`getScaleInterval with [${scaleIntervals.join(',')}] and [${fromIndex},${toIndex}]`, () => {
      const result = getScaleInterval(scaleIntervals, fromIndex, toIndex)
      expect(result).toEqual(expected)
    })
  })

  const generateChordFromScaleDegreeTestCases: {
    scaleRoot: SharpNote
    scale: ScaleEnum
    degree: NaturalDegree
    chordStructure: ChordStructure
    expected: Chord
  }[] = [
    {
      scaleRoot: 'C',
      scale: ScaleEnum.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: ['C', 'E', 'G'],
    },
    {
      scaleRoot: 'C',
      scale: ScaleEnum.Ionian,
      degree: 'II',
      chordStructure: ChordStructure.Tetrad,
      expected: ['D', 'F', 'A', 'C'],
    },
    {
      scaleRoot: 'A',
      scale: ScaleEnum.Eolian,
      degree: 'V',
      chordStructure: ChordStructure.Triad,
      expected: ['E', 'G', 'B'],
    },
  ]
  generateChordFromScaleDegreeTestCases.forEach(
    ({ scaleRoot, scale, degree, chordStructure, expected }) => {
      test(`generateChordFromScaleDegree with ${scaleRoot} and ${degree}`, () => {
        const result = generateChordFromScaleDegree(scaleRoot, scale, degree, chordStructure)
        expect(result).toEqual(expected)
      })
    },
  )

  const generateChordFromDegreesTestCases: {
    chordRoot: SharpNote
    degrees: FullChromaticDegree[]
    expected: Chord
  }[] = [
    {
      chordRoot: 'C',
      degrees: ['I', 'III', 'V'],
      expected: ['C', 'E', 'G'],
    },
  ]
  generateChordFromDegreesTestCases.forEach(({ chordRoot, degrees, expected }) => {
    test(`generateChordFromDegrees with ${chordRoot} and [ ${degrees.join(' ')} ]`, () => {
      const result = generateChordFromDegrees(chordRoot, degrees)
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
    { customQuality: 'E', expected: ['E', 'G#', 'B'] },
    { customQuality: 'C#', expected: ['C#', 'E#', 'G#'] },
    { customQuality: 'D♯', expected: ['D#', 'F##', 'A#'] },
    { customQuality: 'Cb', expected: ['Cb', 'Eb', 'Gb'] },
    { customQuality: 'B♭', expected: ['Bb', 'D', 'F'] },
    { customQuality: 'Cm', expected: ['C', 'Eb', 'G'] },
    { customQuality: 'C-', expected: ['C', 'Eb', 'G'] },
    { customQuality: 'Cmin', expected: ['C', 'Eb', 'G'] },
    { customQuality: 'C+', expected: ['C', 'E', 'G#'] },
    { customQuality: 'Caug', expected: ['C', 'E', 'G#'] },
    { customQuality: 'C°', expected: ['C', 'Eb', 'Gb'] },
    { customQuality: 'Co', expected: ['C', 'Eb', 'Gb'] },
    { customQuality: 'Cdim', expected: ['C', 'Eb', 'Gb'] },
    { customQuality: 'Csus2', expected: ['C', 'D', 'G'] },
    { customQuality: 'Csus4', expected: ['C', 'F', 'G'] },
    { customQuality: 'Csus', expected: ['C', 'F', 'G'] },
    { customQuality: 'C5add9', expected: ['C', 'G', 'D'] },
    { customQuality: 'Csus2b5', expected: ['C', 'D', 'Gb'] },
    { customQuality: 'C7no3', expected: ['C', 'G', 'Bb'] }, // pk pas sus7 ?
    // tetrads
    { customQuality: 'CΔ', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CΔ7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'Cmaj7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CM7', expected: ['C', 'E', 'G', 'B'] },
    { customQuality: 'CmΔ', expected: ['C', 'Eb', 'G', 'B'] },
    { customQuality: 'CmM7', expected: ['C', 'Eb', 'G', 'B'] },
    { customQuality: 'C-maj7', expected: ['C', 'Eb', 'G', 'B'] },
    { customQuality: 'C7', expected: ['C', 'E', 'G', 'Bb'] },
    { customQuality: 'C-7', expected: ['C', 'Eb', 'G', 'Bb'] },
    { customQuality: 'C+7', expected: ['C', 'E', 'G#', 'Bb'] },
    { customQuality: 'Cmin7', expected: ['C', 'Eb', 'G', 'Bb'] },
    { customQuality: 'Cø', expected: ['C', 'Eb', 'Gb', 'Bb'] },
    { customQuality: 'CØ7', expected: ['C', 'Eb', 'Gb', 'Bb'] },
    { customQuality: 'C°7', expected: ['C', 'Eb', 'Gb', 'Bb'] },
    { customQuality: 'C°maj7', expected: ['C', 'Eb', 'Gb', 'B'] },
    { customQuality: 'Cm+7', expected: ['C', 'Eb', 'G#', 'Bb'] },
    { customQuality: 'C+Δ7', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cm7b5', expected: ['C', 'Eb', 'Gb', 'Bb'] },
    { customQuality: 'Cmaj7+5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7#5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7aug5', expected: ['C', 'E', 'G#', 'B'] },
    { customQuality: 'Cmaj7-5', expected: ['C', 'E', 'Gb', 'B'] },
    { customQuality: 'Cmaj7b5', expected: ['C', 'E', 'Gb', 'B'] },
    { customQuality: 'Cmaj7dim5', expected: ['C', 'E', 'Gb', 'B'] },
    { customQuality: 'Cmaj7°5', expected: ['C', 'E', 'Gb', 'B'] },
    { customQuality: 'C6', expected: ['C', 'E', 'G', 'A'] },
    { customQuality: 'Cm6', expected: ['C', 'Eb', 'G', 'A'] },
    { customQuality: 'C2', expected: ['C', 'D', 'E', 'G'] },
    { customQuality: 'C4', expected: ['C', 'E', 'F', 'G'] },
    { customQuality: 'C7sus2', expected: ['C', 'D', 'G', 'Bb'] },
    { customQuality: 'C7sus4', expected: ['C', 'F', 'G', 'Bb'] },
    { customQuality: 'Cadd2', expected: ['C', 'D', 'E', 'G'] },
    { customQuality: 'Cadd4', expected: ['C', 'E', 'F', 'G'] },
    { customQuality: 'Cadd9', expected: ['C', 'E', 'G', 'D'] },
    // experimental
    { customQuality: 'C6/9', expected: ['C', 'E', 'G', 'A', 'D'] },
    { customQuality: 'C7add2', expected: ['C', 'D', 'E', 'G', 'Bb'] },
    { customQuality: 'C7/9', expected: ['C', 'E', 'G', 'Bb', 'D'] },
    { customQuality: 'C7add11', expected: ['C', 'E', 'G', 'Bb', 'F'] },
    { customQuality: 'C7add13', expected: ['C', 'E', 'G', 'Bb', 'A'] },
    { customQuality: 'C9', expected: ['C', 'E', 'G', 'Bb', 'D'] },
    { customQuality: 'Cmaj9', expected: ['C', 'E', 'G', 'B', 'D'] },
    { customQuality: 'CΔ9', expected: ['C', 'E', 'G', 'B', 'D'] },
    { customQuality: 'C7b9', expected: ['C', 'E', 'G', 'Bb', 'Db'] },
    { customQuality: 'C+M9', expected: ['C', 'E', 'G#', 'B', 'D'] },
    { customQuality: 'C9sus4', expected: ['C', 'F', 'G', 'Bb', 'D'] },
    { customQuality: 'C11', expected: ['C', 'E', 'G', 'Bb', 'D', 'F'] }, // G optional
    { customQuality: 'Cmaj11', expected: ['C', 'E', 'G', 'B', 'D', 'F'] },
    { customQuality: 'C9#11', expected: ['C', 'E', 'G', 'Bb', 'D', 'F#'] },
    { customQuality: 'Cmaj9#11', expected: ['C', 'E', 'G', 'B', 'D', 'F#'] },
    { customQuality: 'C13', expected: ['C', 'E', 'G', 'Bb', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'Cmaj13', expected: ['C', 'E', 'G', 'B', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'Cm13b9', expected: ['C', 'Eb', 'G', 'Bb', 'Db', 'F', 'A'] }, // G,F optional
    { customQuality: 'Cm13+11b9', expected: ['C', 'Eb', 'G', 'Bb', 'Db', 'F#', 'A'] }, // G optional,
    { customQuality: 'C13sus', expected: ['C', 'G', 'Bb', 'D', 'F', 'A'] }, // G,D,F optional
    { customQuality: 'C13b5', expected: ['C', 'E', 'Gb', 'Bb', 'D', 'F', 'A'] }, // D,F optional
    { customQuality: 'C7#9b13', expected: ['C', 'E', 'G', 'Bb', 'D#', 'F', 'Ab'] }, // G F optional
    { customQuality: 'C11b13', expected: ['C', 'E', 'G', 'Bb', 'D', 'F', 'Ab'] }, // G,D optional
    { customQuality: 'Cm11b9b13', expected: ['C', 'Eb', 'G', 'Bb', 'Db', 'F', 'Ab'] }, // G optional
  ]
  generateChordFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test(`generateChordFromCustomQuality with ${customQuality}`, () => {
      const result = generateChordFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })

  const generateChromaticDegreesFromCustomQualityTestCases: {
    customQuality: string
    expected: FullChromaticDegree[]
  }[] = [
    {
      customQuality: 'm',
      expected: ['I', 'IIIb', 'V'],
    },
  ]
  generateChromaticDegreesFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test(`generateIntervalsFromCustomQuality with ${customQuality}`, () => {
      const result = generateChromaticDegreesFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })

  const getChromaticNoteFromDegreeTestCases: {
    rootNote: FullChromaticNote
    chromaticDegree: FullChromaticDegree
    expected: FullChromaticNote
  }[] = [
    {
      rootNote: 'C',
      chromaticDegree: 'III',
      expected: 'E',
    },
    {
      rootNote: 'A#',
      chromaticDegree: 'III',
      expected: 'C##', // todo D ?
    },
    {
      rootNote: 'Bb',
      chromaticDegree: 'III',
      expected: 'D',
    },
    {
      rootNote: 'C',
      chromaticDegree: 'IIIb',
      expected: 'Eb',
    },
    {
      rootNote: 'A',
      chromaticDegree: 'IV#',
      expected: 'D#',
    },
    {
      rootNote: 'A',
      chromaticDegree: 'IVb',
      expected: 'Db',
    },
    {
      rootNote: 'Eb',
      chromaticDegree: 'V#',
      expected: 'B',
    },
  ]
  getChromaticNoteFromDegreeTestCases.forEach(({ rootNote, chromaticDegree, expected }) => {
    test(`getChromaticNoteFromDegree with ${rootNote} and ${chromaticDegree}`, () => {
      const result = getChromaticNoteFromDegree(rootNote, chromaticDegree)
      expect(result).toEqual(expected)
    })
  })

  const generateTritonicSubstitutionTestCases: {
    chord: Chord
    expected: Chord
  }[] = [
    {
      chord: ['C', 'E', 'G', 'Bb'],
      expected: ['F#', 'A#', 'C#', 'E'],
    },
    {
      chord: ['G', 'B', 'D', 'F'],
      expected: ['C#', 'F', 'G#', 'B'],
      // expected: ['Db', 'F', 'Ab', 'Cb'], why not, see: https://fr.wikipedia.org/wiki/Substitution_tritonique
    },
  ]
  generateTritonicSubstitutionTestCases.forEach(({ chord, expected }) => {
    test(`generateTritonicSubstitution with [${chord.join(',')}]`, () => {
      const result = generateTritonicSubstitution(chord)
      expect(result).toEqual(expected)
    })
  })
})
