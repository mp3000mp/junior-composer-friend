import {
  type Degree,
  type Mode,
  type SharpNote,
  type ScaleIntervals,
  type FullChromaticNote,
  NATURAL_CHROMATIC_SCALE
} from '@/music/types'
import { SHARP_CHROMATIC_SCALE, Interval, FULL_CHROMATIC_NOTES_INDICES } from '@/music/types'
import { getAlteration, getNaturalNote, getSharpNote, transposeNote } from '@/music/utils'
import {
  FULL_CHROMATIC_DEGREE_SEMITONES,
  type FullChromaticDegree,
  MODE_INTERVALS, NATURAL_DEGREE_SEMITONES,
  type NaturalDegree,
  ORDERED_DEGREES
} from '@/music/scale/types'
import { type Chord, CHORD_STRUCTURE_DEFINITIONS, ChordStructure, type StructuredChord } from '@/music/chord/types'

function getScaleInterval(
  scaleIntervals: ScaleIntervals,
  fromIndex: number,
  toIndex: number,
): number {
  const scaleLength = scaleIntervals.length
  const sevenFrom = fromIndex % scaleLength
  const sevenTo = toIndex % scaleLength
  let semiToneSum = 0

  if (sevenFrom < sevenTo) {
    for (let i = sevenFrom; i < sevenTo; i++) {
      semiToneSum += scaleIntervals[i]
    }
  } else if (sevenFrom > sevenTo) {
    for (let i = sevenTo; i > sevenFrom; i--) {
      semiToneSum += scaleIntervals[i]
    }
  }

  return semiToneSum
}

export function generateChordFromModeDegree(
  modeRoot: SharpNote,
  mode: Mode,
  degree: Degree,
  chordStructure: ChordStructure,
): Chord {
  const degreeIndex = ORDERED_DEGREES.indexOf(degree)
  const scaleIntervals = MODE_INTERVALS[mode]
  const rootInterval = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const chordRoot = transposeNote(modeRoot, rootInterval)

  const chordStructureDefinition = CHORD_STRUCTURE_DEFINITIONS[chordStructure]
  const chord: Chord = []
  for (const orderedNote of chordStructureDefinition) {
    chord.push(transposeNote(chordRoot, getScaleInterval(scaleIntervals, 0, orderedNote)))
  }

  return chord
}

export function getChromaticNoteFromDegree(rootNote: FullChromaticNote, chromaticDegree: FullChromaticDegree): FullChromaticNote {
  const rootNoteIndex = NATURAL_CHROMATIC_SCALE.indexOf(getNaturalNote(rootNote))
  const naturalDegreeIndex = ORDERED_DEGREES.indexOf(getNaturalDegree(chromaticDegree))
  const naturalNote = NATURAL_CHROMATIC_SCALE[(rootNoteIndex+naturalDegreeIndex) % 7]

  const chromaticDegreeInterval = FULL_CHROMATIC_DEGREE_SEMITONES[chromaticDegree]
  const fullChromaticNote = transposeNote(rootNote, chromaticDegreeInterval)
  const alteration = getAlteration(naturalNote, fullChromaticNote)

  return naturalNote+alteration
}

export function generateChordFromDegrees(chordRoot: FullChromaticNote, degrees: FullChromaticDegree[]): Chord {
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
  return fullChromaticDegree.replace('b', '').replace('#', '')
}

/**
 * customQuality without root
 *
 * todo: bass
 */
export function generateChromaticDegreesFromCustomQuality(customQuality: string): FullChromaticDegree[] {
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
    multiIncludes(customQuality, ['dim', '-5', 'b5', '°5', 'o5'])
  ) {
    fifth = 'b'
  } else if (arrQuality[0] === '+' || multiIncludes(customQuality, ['aug', '+5', '#5', 'm+'])) {
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
  if (multiIncludes(customQuality, ['b9'])) {
    ninth = 'b'
  } else if (
    customQuality.includes('9') ||
    (customQuality.includes('11') && !customQuality.includes('add11')) ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    ninth = ''
  }
  // eleventh
  if (multiIncludes(customQuality, ['#11', '+11'])) {
    eleventh = '#'
  } else if (
    customQuality.includes('11') ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    eleventh = ''
  }
  // thirteenth
  if (customQuality.includes('b13')) {
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
    chordDefinition.push(ninth === 'b' ? 'IIb' : 'II')
  }
  if (eleventh !== null) {
    chordDefinition.push(eleventh === '#' ? 'IV#' : 'IV')
  }
  if (thirteenth !== null) {
    chordDefinition.push(thirteenth === 'b' ? 'VIb' : 'VI')
  }

  return chordDefinition
}

export function generateChordFromCustomQuality(customQuality: string): Chord {
  const arrQuality = Array.from(customQuality)
  if (arrQuality.length === 0) {
    return []
  }

  let chordRoot = arrQuality[0]
  let arrQualityRootLess = arrQuality.slice(1)
  if (arrQualityRootLess.length > 0 && ['b', '#'].includes(arrQualityRootLess[0])) {
    chordRoot += arrQualityRootLess[0]
    arrQualityRootLess = arrQualityRootLess.slice(1)
  }

  if (!Object.keys(FULL_CHROMATIC_NOTES_INDICES).includes(chordRoot)) {
    return []
  }
  return generateChordFromDegrees(
    chordRoot,
    generateChromaticDegreesFromCustomQuality(arrQualityRootLess.join('')),
  )
}
