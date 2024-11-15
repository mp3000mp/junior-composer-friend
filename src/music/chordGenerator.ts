import type { Degree, Mode, Note, ScaleIntervals } from '@/music/types'
import {
  type Chord,
  CHORD_STRUCTURE_DEFINITIONS,
  ChordStructure,
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
  root: Note,
  mode: Mode,
  degree: Degree,
  chordStructure: ChordStructure,
): Chord {
  const degreeIndex = ORDERED_DEGREES.indexOf(degree)
  const scaleIntervals = MODE_INTERVALS[mode]
  const rootInterval = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const tonic = transposeNote(root, rootInterval)

  const chordStructureDefinition = CHORD_STRUCTURE_DEFINITIONS[chordStructure]
  const chord: Chord = []
  for (const orderedNote of chordStructureDefinition) {
    chord.push(transposeNote(tonic, getScaleInterval(scaleIntervals, 0, orderedNote)))
  }

  return chord
}

/**
 * @param root
 * @param customQuality
 */
export function generateIntervalsFromCustomQuality(root: Note, customQuality: string): Interval[] {
  const chordDefinition = [Interval.Tonic]

  // todo replace triangle => chéplu
  // todo replace rond => chéplu
  // todo replace rond barré => m7b5

  // second
  if (customQuality.includes('2')) {
    chordDefinition.push(Interval.Second)
  }

  // third
  if (customQuality.includes('5') || customQuality.includes('sus')) {
    // no third
  } else if (customQuality.indexOf('maj') !== 0 && Array.from(customQuality)[0] === 'm') {
    chordDefinition.push(Interval.MinorThird)
  } else {
    // todo toujours ?
    chordDefinition.push(Interval.MajorThird)
  }

  // fourth
  if (customQuality.includes('4')) {
    chordDefinition.push(Interval.Fourth)
  }

  // fifth
  if (
    customQuality.includes('b5') ||
    customQuality.includes('dim') ||
    customQuality.includes('-')
  ) {
    chordDefinition.push(Interval.DiminishedFifth)
  } else if (
    customQuality.includes('#5') ||
    customQuality.includes('aug') ||
    customQuality.includes('+')
  ) {
    chordDefinition.push(Interval.MinorSixth) // AugmentedFifth
  } else {
    // todo pas toujours
    chordDefinition.push(Interval.Fifth)
  }

  // sixth
  // todo sixth mineur ?
  if (customQuality.includes('6')) {
    chordDefinition.push(Interval.MajorSixth)
  }

  // seventh
  if (customQuality.includes('add')) {
    // no seventh
  } else if (customQuality.includes('maj7') || customQuality.includes('7M')) {
    chordDefinition.push(Interval.MajorSeventh)
  } else if (customQuality.includes('7')) {
    chordDefinition.push(Interval.MinorSeventh)
  }

  // ninth
  if (customQuality.includes('b9')) {
    chordDefinition.push(Interval.DiminishedSecond)
  } else if (customQuality.includes('#9')) {
    chordDefinition.push(Interval.MinorThird) // AugmentedSecond
  } else if (customQuality.includes('9')) {
    chordDefinition.push(Interval.Second)
  }

  // eleventh
  if (customQuality.includes('b11')) {
    chordDefinition.push(Interval.MajorThird) // DiminishedFourth
  } else if (customQuality.includes('#11')) {
    chordDefinition.push(Interval.DiminishedFifth) // AugmentedFourth
  } else if (customQuality.includes('11')) {
    chordDefinition.push(Interval.Fourth)
  }

  // thirteenth
  // todo sixth mineur ?
  if (customQuality.includes('13')) {
    chordDefinition.push(Interval.MajorSixth)
  }

  return chordDefinition
}

export function generateChordFromIntervals(root: Note, intervals: Interval[]): Chord {
  const chord: Chord = []
  for (const interval of intervals) {
    chord.push(transposeNote(root, interval))
  }

  return chord
}

export function generateChordFromCustomQuality(root: Note, customQuality: string): Chord {
  return generateChordFromIntervals(root, generateIntervalsFromCustomQuality(root, customQuality))
}
