import { describe, expect, test } from 'vitest'
import {
  generateChordFromCustomQuality,
  generateChordFromIntervals,
  generateChordFromScaleDegree,
  generateTritonicSubstitution,
  getScaleInterval,
} from '../chordGenerator'
import { type Chord, ChordStructure, Interval } from '@/music/chord/types'
import { type NaturalDegree, ScaleEnum, type ScaleIntervals } from '@/music/scale/types'
import { type Note } from '@/music/types'
import { makeNote } from '../../../test-utils'
import { noteToString } from '../../utils'

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
    scaleRootNote: Note
    scale: ScaleEnum
    degree: NaturalDegree
    chordStructure: ChordStructure
    expected: Chord
  }[] = [
    {
      scaleRootNote: makeNote('C'),
      scale: ScaleEnum.Ionian,
      degree: 'I',
      chordStructure: ChordStructure.Triad,
      expected: [makeNote('C'), makeNote('E'), makeNote('G')],
    },
    {
      scaleRootNote: makeNote('C'),
      scale: ScaleEnum.Ionian,
      degree: 'II',
      chordStructure: ChordStructure.Tetrad,
      expected: [makeNote('D'), makeNote('F'), makeNote('A'), makeNote('C')],
    },
    {
      scaleRootNote: makeNote('A'),
      scale: ScaleEnum.Eolian,
      degree: 'V',
      chordStructure: ChordStructure.Triad,
      expected: [makeNote('E'), makeNote('G'), makeNote('B')],
    },
  ]
  generateChordFromScaleDegreeTestCases.forEach(
    ({ scaleRootNote, scale, degree, chordStructure, expected }) => {
      test(`generateChordFromScaleDegree with ${noteToString(scaleRootNote)} and ${degree}`, () => {
        const result = generateChordFromScaleDegree(scaleRootNote, scale, degree, chordStructure)
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
      chordRoot: makeNote('C'),
      intervals: [Interval.Tonic, Interval.MajorThird, Interval.Fifth],
      expected: [makeNote('C'), makeNote('E'), makeNote('G')],
    },
    {
      chordRoot: makeNote('C', '#'),
      intervals: [Interval.Tonic, Interval.MajorThird, Interval.Fifth],
      expected: [makeNote('C', '#'), makeNote('E', '#'), makeNote('G', '#')],
    },
    {
      chordRoot: makeNote('D', 'b'),
      intervals: [Interval.Tonic, Interval.MajorThird, Interval.Fifth],
      expected: [makeNote('D', 'b'), makeNote('F'), makeNote('A', 'b')],
    },
  ]
  generateChordFromIntervalsTestCases.forEach(({ chordRoot, intervals, expected }) => {
    test(`generateChordFromDegrees with ${noteToString(chordRoot)} and [ ${intervals.join(' ')} ]`, () => {
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
    { customQuality: 'C5', expected: [makeNote('C'), makeNote('G')] },
    // triads
    { customQuality: 'C', expected: [makeNote('C'), makeNote('E'), makeNote('G')] },
    { customQuality: 'E', expected: [makeNote('E'), makeNote('G', '#'), makeNote('B')] },
    { customQuality: 'C#', expected: [makeNote('C', '#'), makeNote('E', '#'), makeNote('G', '#')] },
    {
      customQuality: 'D♯',
      expected: [makeNote('D', '#'), makeNote('F', '##'), makeNote('A', '#')],
    },
    { customQuality: 'Cb', expected: [makeNote('C', 'b'), makeNote('E', 'b'), makeNote('G', 'b')] },
    { customQuality: 'B♭', expected: [makeNote('B', 'b'), makeNote('D'), makeNote('F')] },
    { customQuality: 'Cm', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G')] },
    { customQuality: 'C-', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G')] },
    { customQuality: 'Cmin', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G')] },
    { customQuality: 'C+', expected: [makeNote('C'), makeNote('E'), makeNote('G', '#')] },
    { customQuality: 'Caug', expected: [makeNote('C'), makeNote('E'), makeNote('G', '#')] },
    { customQuality: 'C°', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b')] },
    { customQuality: 'Co', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b')] },
    { customQuality: 'Cdim', expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b')] },
    { customQuality: 'Csus2', expected: [makeNote('C'), makeNote('D'), makeNote('G')] },
    { customQuality: 'Csus4', expected: [makeNote('C'), makeNote('F'), makeNote('G')] },
    { customQuality: 'Csus', expected: [makeNote('C'), makeNote('F'), makeNote('G')] },
    { customQuality: 'C5add9', expected: [makeNote('C'), makeNote('G'), makeNote('D')] },
    { customQuality: 'Csus2b5', expected: [makeNote('C'), makeNote('D'), makeNote('G', 'b')] },
    { customQuality: 'C7no3', expected: [makeNote('C'), makeNote('G'), makeNote('B', 'b')] }, // pk pas sus7 ?
    // tetrads
    { customQuality: 'CΔ', expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B')] },
    {
      customQuality: 'CΔ7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'CM7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'CmΔ',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'CmM7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'C-maj7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('B')],
    },
    {
      customQuality: 'C7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C-7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C+7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B', 'b')],
    },
    {
      customQuality: 'Cmin7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'Cø',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b'), makeNote('B', 'b')],
    },
    {
      customQuality: 'CØ7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C°7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C°maj7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b'), makeNote('B')],
    },
    {
      customQuality: 'Cm+7',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', '#'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C+Δ7',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B')],
    },
    {
      customQuality: 'Cm7b5',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G', 'b'), makeNote('B', 'b')],
    },
    {
      customQuality: 'Cmaj7+5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7#5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7aug5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7-5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', 'b'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7b5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', 'b'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7dim5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', 'b'), makeNote('B')],
    },
    {
      customQuality: 'Cmaj7°5',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', 'b'), makeNote('B')],
    },
    { customQuality: 'C6', expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('A')] },
    {
      customQuality: 'Cm6',
      expected: [makeNote('C'), makeNote('E', 'b'), makeNote('G'), makeNote('A')],
    },
    { customQuality: 'C2', expected: [makeNote('C'), makeNote('D'), makeNote('E'), makeNote('G')] },
    { customQuality: 'C4', expected: [makeNote('C'), makeNote('E'), makeNote('F'), makeNote('G')] },
    {
      customQuality: 'C7sus2',
      expected: [makeNote('C'), makeNote('D'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C7sus4',
      expected: [makeNote('C'), makeNote('F'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'Cadd2',
      expected: [makeNote('C'), makeNote('D'), makeNote('E'), makeNote('G')],
    },
    {
      customQuality: 'Cadd4',
      expected: [makeNote('C'), makeNote('E'), makeNote('F'), makeNote('G')],
    },
    {
      customQuality: 'Cadd9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('D')],
    },
    // experimental
    {
      customQuality: 'C6/9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('A'), makeNote('D')],
    },
    {
      customQuality: 'C7add2',
      expected: [makeNote('C'), makeNote('D'), makeNote('E'), makeNote('G'), makeNote('B', 'b')],
    },
    {
      customQuality: 'C7/9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b'), makeNote('D')],
    },
    {
      customQuality: 'C7add11',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b'), makeNote('F')],
    },
    {
      customQuality: 'C7add13',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b'), makeNote('A')],
    },
    {
      customQuality: 'C9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b'), makeNote('D')],
    },
    {
      customQuality: 'Cmaj9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B'), makeNote('D')],
    },
    {
      customQuality: 'CΔ9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B'), makeNote('D')],
    },
    {
      customQuality: 'C7b9',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', 'b'),
      ],
    },
    {
      customQuality: 'C+M9',
      expected: [makeNote('C'), makeNote('E'), makeNote('G', '#'), makeNote('B'), makeNote('D')],
    },
    {
      customQuality: 'C9sus4',
      expected: [makeNote('C'), makeNote('F'), makeNote('G'), makeNote('B', 'b'), makeNote('D')],
    },
    {
      customQuality: 'C11',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
      ],
    }, // G optional
    {
      customQuality: 'Cmaj11',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B'),
        makeNote('D'),
        makeNote('F'),
      ],
    },
    {
      customQuality: 'C9#11',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F', '#'),
      ],
    },
    {
      customQuality: 'Cmaj9#11',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B'),
        makeNote('D'),
        makeNote('F', '#'),
      ],
    },
    {
      customQuality: 'C13',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
    }, // G,D,F optional
    {
      customQuality: 'Cmaj13',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
    }, // G,D,F optional
    {
      customQuality: 'Cm13b9',
      expected: [
        makeNote('C'),
        makeNote('E', 'b'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', 'b'),
        makeNote('F'),
        makeNote('A'),
      ],
    }, // G,F optional
    {
      customQuality: 'Cm13+11b9',
      expected: [
        makeNote('C'),
        makeNote('E', 'b'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', 'b'),
        makeNote('F', '#'),
        makeNote('A'),
      ],
    }, // G optional,
    {
      customQuality: 'C13sus',
      expected: [
        makeNote('C'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
    }, // G,D,F optional
    {
      customQuality: 'C13b5',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G', 'b'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A'),
      ],
    }, // D,F optional
    {
      customQuality: 'C7#9b13',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', '#'),
        makeNote('F'),
        makeNote('A', 'b'),
      ],
    }, // G F optional
    {
      customQuality: 'C11b13',
      expected: [
        makeNote('C'),
        makeNote('E'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D'),
        makeNote('F'),
        makeNote('A', 'b'),
      ],
    }, // G,D optional
    {
      customQuality: 'Cm11b9b13',
      expected: [
        makeNote('C'),
        makeNote('E', 'b'),
        makeNote('G'),
        makeNote('B', 'b'),
        makeNote('D', 'b'),
        makeNote('F'),
        makeNote('A', 'b'),
      ],
    }, // G optional
  ]
  generateChordFromCustomQualityTestCases.forEach(({ customQuality, expected }) => {
    test(`generateChordFromCustomQuality with ${customQuality}`, () => {
      const result = generateChordFromCustomQuality(customQuality)
      expect(result).toEqual(expected)
    })
  })

  const generateTritonicSubstitutionTestCases: {
    chord: Chord
    expected: Chord
  }[] = [
    {
      chord: [makeNote('C'), makeNote('E'), makeNote('G'), makeNote('B', 'b')],
      expected: [makeNote('F', '#'), makeNote('A', '#'), makeNote('C', '#'), makeNote('E')],
    },
    {
      chord: [makeNote('G'), makeNote('B'), makeNote('D'), makeNote('F')],
      expected: [makeNote('C', '#'), makeNote('F'), makeNote('G', '#'), makeNote('B')],
      // expected: ['Db', 'F', 'Ab', 'Cb'], why not, see: https://fr.wikipedia.org/wiki/Substitution_tritonique
    },
  ]
  generateTritonicSubstitutionTestCases.forEach(({ chord, expected }) => {
    test(`generateTritonicSubstitution with [${chord.map((note) => noteToString(note)).join(',')}]`, () => {
      const result = generateTritonicSubstitution(chord)
      expect(result).toEqual(expected)
    })
  })
})
