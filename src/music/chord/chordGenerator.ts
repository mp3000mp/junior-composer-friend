import { NOTE_LETTERS, type Note } from '@/music/types'
import { transposeChord, transposeNote, transposeNoteByInterval } from '@/music/utils'
import {
  type ScaleIntervals,
  SCALE_INTERVALS,
  type NaturalDegree,
  ORDERED_DEGREES,
  ScaleEnum,
} from '@/music/scale/types'
import {
  type Chord,
  CHORD_STRUCTURE_DEFINITIONS,
  ChordStructure,
  Interval,
} from '@/music/chord/types'

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

export function generateChordFromIntervals(chordRoot: Note, intervals: Interval[]): Chord {
  const chord: Chord = []
  for (const interval of intervals) {
    chord.push(transposeNoteByInterval(chordRoot, interval))
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
export function generateChordIntervalsFromCustomQuality(customQuality: string): Interval[] {
  const chordIntervals = [Interval.Tonic]
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
    chordIntervals.push(Interval.Second)
  }
  if (third !== null) {
    chordIntervals.push(third === 'b' ? Interval.MinorThird : Interval.MajorThird)
  }
  if (fourth !== null) {
    chordIntervals.push(Interval.Fourth)
  }
  if (fifth === 'b') {
    chordIntervals.push(Interval.DiminishedFifth)
  } else if (fifth === '#') {
    chordIntervals.push(Interval.AugmentedFifth)
  } else {
    chordIntervals.push(Interval.Fifth)
  }
  if (sixth !== null) {
    chordIntervals.push(Interval.MajorSixth)
  }
  if (seventh !== null) {
    chordIntervals.push(seventh === 'b' ? Interval.MinorSeventh : Interval.MajorSeventh)
  }
  if (ninth !== null) {
    if (ninth === 'b') {
      chordIntervals.push(Interval.DiminishedNinth)
    } else if (ninth === '#') {
      chordIntervals.push(Interval.AugmentedNinth)
    } else {
      chordIntervals.push(Interval.Ninth)
    }
  }
  if (eleventh !== null) {
    chordIntervals.push(eleventh === '#' ? Interval.AugmentedEleventh : Interval.Eleventh)
  }
  if (thirteenth !== null) {
    chordIntervals.push(thirteenth === 'b' ? Interval.DiminishedThirteenth : Interval.Thirteenth)
  }

  return chordIntervals
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

  return generateChordFromIntervals(
    chordRootNote,
    generateChordIntervalsFromCustomQuality(arrQualityRootLess.join('')),
  )
}

// todo find rules
export function generateTritonicSubstitution(chord: Chord): Chord {
  return transposeChord(chord, 6)
}
