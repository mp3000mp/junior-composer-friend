import type { Degree, Mode, SharpNote, ScaleIntervals } from '@/music/types'
import {
  type Chord,
  CHORD_STRUCTURE_DEFINITIONS,
  ChordStructure,
  CHROMATIC_SCALE,
  Interval,
  MODE_INTERVALS,
  ORDERED_DEGREES,
} from '@/music/types'
import { transposeNote } from '@/music/utils'

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

export function generateChordFromIntervals(chordRoot: SharpNote, intervals: Interval[]): Chord {
  const chord: Chord = []
  for (const interval of intervals) {
    chord.push(transposeNote(chordRoot, interval))
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

/**
 * customQuality without root
 *
 * todo: bass
 */
export function generateIntervalsFromCustomQuality(customQuality: string): Interval[] {
  const chordDefinition = [Interval.Tonic]
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
    chordDefinition.push(Interval.Second)
  }
  if (third !== null) {
    chordDefinition.push(third === 'b' ? Interval.MinorThird : Interval.MajorThird)
  }
  if (fourth !== null) {
    chordDefinition.push(Interval.Fourth)
  }
  if (fifth === 'b') {
    chordDefinition.push(Interval.DiminishedFifth)
  } else if (fifth === '#') {
    chordDefinition.push(Interval.MinorSixth) // AugmentedFifth
  } else {
    chordDefinition.push(Interval.Fifth)
  }
  if (sixth !== null) {
    chordDefinition.push(Interval.MajorSixth)
  }
  if (seventh !== null) {
    chordDefinition.push(seventh === 'b' ? Interval.MinorSeventh : Interval.MajorSeventh)
  }
  if (ninth !== null) {
    chordDefinition.push(ninth === 'b' ? Interval.DiminishedSecond : Interval.Second)
  }
  if (eleventh !== null) {
    chordDefinition.push(eleventh === '#' ? Interval.DiminishedFifth : Interval.Fourth)
  }
  if (thirteenth !== null) {
    chordDefinition.push(thirteenth === 'b' ? Interval.MinorSixth : Interval.MajorSixth)
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

  if (!CHROMATIC_SCALE.includes(chordRoot)) {
    return []
  }
  return generateChordFromIntervals(
    chordRoot,
    generateIntervalsFromCustomQuality(arrQualityRootLess.join('')),
  )
}
