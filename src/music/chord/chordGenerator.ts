import { NOTE_LETTERS, type Note } from '@/music/types'
import { getAlteration, transposeChord, transposeNote } from '@/music/utils'
import {
  FULL_CHROMATIC_DEGREE_SEMITONES,
  type FullChromaticDegree,
  type ScaleIntervals,
  SCALE_INTERVALS,
  type NaturalDegree,
  ORDERED_DEGREES,
  ScaleEnum,
} from '@/music/scale/types'
import { type Chord, CHORD_STRUCTURE_DEFINITIONS, ChordStructure } from '@/music/chord/types'

export function getScaleInterval(
  scaleIntervals: ScaleIntervals,
  fromIndex: number,
  toIndex: number,
): number {
  const scaleLength = scaleIntervals.length
  const sevenFrom = fromIndex % scaleLength
  const sevenTo = toIndex % scaleLength

  let semiToneSum = 0
  for (let i = sevenFrom; i !== sevenTo; i = (i + 1) % scaleLength) {
    semiToneSum += scaleIntervals[i]
  }

  return semiToneSum
}

export function generateChordFromScaleDegree(
  scaleRootNote: Note,
  scale: ScaleEnum,
  degree: NaturalDegree,
  chordStructure: ChordStructure,
): Chord {
  const degreeIndex = ORDERED_DEGREES.indexOf(degree)
  const scaleIntervals = SCALE_INTERVALS[scale]
  const rootInterval = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const chordRoot = transposeNote(scaleRootNote, rootInterval)

  const chordStructureDefinition = CHORD_STRUCTURE_DEFINITIONS[chordStructure]
  const chord: Chord = []
  for (const orderedNote of chordStructureDefinition) {
    chord.push(
      transposeNote(
        chordRoot,
        getScaleInterval(scaleIntervals, degreeIndex, degreeIndex + orderedNote),
      ),
    )
  }

  return chord
}

export function getChromaticNoteFromDegree(
  rootNote: Note,
  chromaticDegree: FullChromaticDegree,
): Note {
  // todo: input scale ?
  const rootNoteIndex = NOTE_LETTERS.indexOf(rootNote.letter)
  const naturalDegreeIndex = ORDERED_DEGREES.indexOf(getNaturalDegree(chromaticDegree))
  const naturalNoteLetter = NOTE_LETTERS[(rootNoteIndex + naturalDegreeIndex) % 7]

  const chromaticDegreeInterval = FULL_CHROMATIC_DEGREE_SEMITONES[chromaticDegree]
  const alteration = getAlteration(naturalNoteLetter, chromaticDegreeInterval)

  return {
    letter: naturalNoteLetter,
    alteration: alteration,
  }
}

export function generateChordFromDegrees(chordRoot: Note, degrees: FullChromaticDegree[]): Chord {
  const chord: Chord = []
  for (const degree of degrees) {
    chord.push(getChromaticNoteFromDegree(chordRoot, degree))
  }

  return chord
}

type noteQuality = null | '' | 'b' | '#'

function multiIncludes(str: string, includes: string[]): boolean {
  for (const include of includes) {
    if (str.includes(include)) {
      return true
    }
  }
  return false
}

export function getNaturalDegree(fullChromaticDegree: FullChromaticDegree): NaturalDegree {
  return fullChromaticDegree.replace('b', '').replace('#', '') as NaturalDegree
}

/**
 * customQuality without root
 *
 * todo: bass
 */
export function generateChromaticDegreesFromCustomQuality(
  customQuality: string,
): FullChromaticDegree[] {
  const chordDefinition = ['I']
  const arrQuality = Array.from(customQuality)

  let second: noteQuality = null
  let third: noteQuality = ''
  let fourth: noteQuality = null
  let fifth: noteQuality = ''
  let sixth: noteQuality = null
  let seventh: noteQuality = null
  let ninth: noteQuality = null
  let eleventh: noteQuality = null
  let thirteenth: noteQuality = null

  // second
  if (arrQuality.includes('2')) {
    second = ''
  }
  // third
  if (
    customQuality.substring(0, 3) !== 'maj' &&
    ['m', '-', '°', 'o', 'ø', 'Ø', 'd'].includes(arrQuality[0])
  ) {
    third = 'b'
  } else if (arrQuality[0] === '5' || multiIncludes(customQuality, ['sus', 'no3'])) {
    third = null
  }
  // fourth
  if (
    arrQuality.includes('4') ||
    (customQuality.includes('sus') &&
      !customQuality.includes('sus2') &&
      !customQuality.includes('13sus'))
  ) {
    fourth = ''
  }
  // fifth
  if (
    ['°', 'o', 'ø', 'Ø'].includes(arrQuality[0]) ||
    multiIncludes(customQuality, ['dim', '-5', 'b5', '♭5', '°5', 'o5'])
  ) {
    fifth = 'b'
  } else if (
    arrQuality[0] === '+' ||
    multiIncludes(customQuality, ['aug', '+5', '#5', '♯5', 'm+'])
  ) {
    fifth = '#'
  }
  // sixth
  if (arrQuality.includes('6')) {
    sixth = ''
  }
  // seventh
  if (multiIncludes(customQuality, ['maj', 'M', 'Δ'])) {
    seventh = ''
  } else if (
    multiIncludes(customQuality, ['7', 'ø', 'Ø']) ||
    (customQuality.includes('9') &&
      !customQuality.includes('add9') &&
      !customQuality.includes('6/9')) ||
    (customQuality.includes('11') && !customQuality.includes('add11')) ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    seventh = 'b'
  }
  // ninth
  if (multiIncludes(customQuality, ['b9', '♭9'])) {
    ninth = 'b'
  } else if (multiIncludes(customQuality, ['#9', '♯9'])) {
    ninth = '#'
  } else if (
    customQuality.includes('9') ||
    (customQuality.includes('11') && !customQuality.includes('add11')) ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    ninth = ''
  }
  // eleventh
  if (multiIncludes(customQuality, ['#11', '♯11', '+11'])) {
    eleventh = '#'
  } else if (
    customQuality.includes('11') ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    eleventh = ''
  }
  // thirteenth
  if (multiIncludes(customQuality, ['b13', '♭13'])) {
    thirteenth = 'b'
  } else if (customQuality.includes('13')) {
    thirteenth = ''
  }

  if (second !== null) {
    chordDefinition.push('II')
  }
  if (third !== null) {
    chordDefinition.push(third === 'b' ? 'IIIb' : 'III')
  }
  if (fourth !== null) {
    chordDefinition.push('IV')
  }
  if (fifth === 'b') {
    chordDefinition.push('Vb')
  } else if (fifth === '#') {
    chordDefinition.push('V#')
  } else {
    chordDefinition.push('V')
  }
  if (sixth !== null) {
    chordDefinition.push('VI')
  }
  if (seventh !== null) {
    chordDefinition.push(seventh === 'b' ? 'VIIb' : 'VII')
  }
  if (ninth !== null) {
    if (ninth === 'b') {
      chordDefinition.push('IIb')
    } else if (ninth === '#') {
      chordDefinition.push('II#')
    } else {
      chordDefinition.push('II')
    }
  }
  if (eleventh !== null) {
    chordDefinition.push(eleventh === '#' ? 'IV#' : 'IV')
  }
  if (thirteenth !== null) {
    chordDefinition.push(thirteenth === 'b' ? 'VIb' : 'VI')
  }

  return chordDefinition as FullChromaticDegree[]
}

export function generateChordFromCustomQuality(customQuality: string): Chord {
  // todo function sanitize
  customQuality = customQuality.replace('♭', 'b').replace('♯', '#')
  const arrQuality = Array.from(customQuality)
  if (arrQuality.length === 0) {
    return []
  }

  const chordRootLetter = arrQuality[0]
  if (!NOTE_LETTERS.includes(chordRootLetter)) {
    // todo throw error ?
    return []
  }
  const chordRootNote: Note = {
    letter: chordRootLetter,
    alteration: '',
  }

  let arrQualityRootLess = arrQuality.slice(1)
  if (arrQualityRootLess.length > 0 && ['b', '#'].includes(arrQualityRootLess[0])) {
    chordRootNote.alteration = arrQualityRootLess[0]
    arrQualityRootLess = arrQualityRootLess.slice(1)
  }

  return generateChordFromDegrees(
    chordRootNote,
    generateChromaticDegreesFromCustomQuality(arrQualityRootLess.join('')),
  )
}

export function generateTritonicSubstitution(chord: Chord): Chord {
  // todo
  return transposeChord(chord, 6)
}
