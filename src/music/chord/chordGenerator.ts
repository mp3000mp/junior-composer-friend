import { NOTE_LETTERS, type Alteration, type NoteLetter, type Note } from '@/music/types'
import { transposeNoteByInterval } from '@/music/utils'
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
  const rootSemitones = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const chordRoot = transposeNoteByInterval(scaleRootNote, {
    diatonicSteps: degreeIndex,
    semitones: rootSemitones,
  })

  const chordStructureDefinition = CHORD_STRUCTURE_DEFINITIONS[chordStructure]
  const chord: Chord = []
  for (const orderedNote of chordStructureDefinition) {
    chord.push(
      transposeNoteByInterval(chordRoot, {
        diatonicSteps: orderedNote,
        semitones: getScaleInterval(scaleIntervals, degreeIndex, degreeIndex + orderedNote),
      }),
    )
  }

  return chord
}

type noteQuality = null | '' | 'b' | '#'

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
  } else if (arrQuality[0] === '5' || ['sus', 'no3'].some((s) => customQuality.includes(s))) {
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
    ['dim', '-5', 'b5', '♭5', '°5', 'o5'].some((s) => customQuality.includes(s))
  ) {
    fifth = 'b'
  } else if (
    arrQuality[0] === '+' ||
    ['aug', '+5', '#5', '♯5', 'm+'].some((s) => customQuality.includes(s))
  ) {
    fifth = '#'
  }
  // sixth
  if (arrQuality.includes('6')) {
    sixth = ''
  }
  // seventh
  if (['maj', 'M', 'Δ'].some((s) => customQuality.includes(s))) {
    seventh = ''
  } else if (
    ['7', 'ø', 'Ø'].some((s) => customQuality.includes(s)) ||
    (customQuality.includes('9') &&
      !customQuality.includes('add9') &&
      !customQuality.includes('6/9')) ||
    (customQuality.includes('11') && !customQuality.includes('add11')) ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    seventh = 'b'
  }
  // ninth
  if (['b9', '♭9'].some((s) => customQuality.includes(s))) {
    ninth = 'b'
  } else if (['#9', '♯9'].some((s) => customQuality.includes(s))) {
    ninth = '#'
  } else if (
    customQuality.includes('9') ||
    (customQuality.includes('11') && !customQuality.includes('add11')) ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    ninth = ''
  }
  // eleventh
  if (['#11', '♯11', '+11'].some((s) => customQuality.includes(s))) {
    eleventh = '#'
  } else if (
    customQuality.includes('11') ||
    (customQuality.includes('13') && !customQuality.includes('add13'))
  ) {
    eleventh = ''
  }
  // thirteenth
  if (['b13', '♭13'].some((s) => customQuality.includes(s))) {
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
  if (!(NOTE_LETTERS as string[]).includes(chordRootLetter)) {
    // todo throw error ?
    return []
  }
  const chordRootNote: Note = {
    letter: chordRootLetter as NoteLetter,
    alteration: '',
  }

  let arrQualityRootLess = arrQuality.slice(1)
  if (arrQualityRootLess.length > 0 && ['b', '#'].includes(arrQualityRootLess[0])) {
    chordRootNote.alteration = arrQualityRootLess[0] as Alteration
    arrQualityRootLess = arrQualityRootLess.slice(1)
  }

  const intervals = generateChordIntervalsFromCustomQuality(arrQualityRootLess.join(''))
  return intervals.map((interval) => transposeNoteByInterval(chordRootNote, interval))
}
