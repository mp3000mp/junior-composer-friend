import {
  CHORD_QUALITY_DEFINITIONS,
  CHORD_STRUCTURE_DEFINITIONS, ChordQuality,
  ChordStructure, CHROMATIC_SCALE,
  type Degree,
  type Mode,
  type Note, ORDERED_DEGREES,
  type ScaleIntervals
} from '@/music/types'
import { MODE_INTERVALS } from '@/music/types'

function getNoteInterval(fromNote: Note, toNote: Note): number {
  const fromIndex = CHROMATIC_SCALE.indexOf(fromNote)
  const toIndex = CHROMATIC_SCALE.indexOf(toNote)
  if (fromIndex <= toIndex) {
    return toIndex - fromIndex
  }
  return toIndex - fromIndex + CHROMATIC_SCALE.length
}

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

export function transpose(root: Note, interval: number): Note {
  const rootIndex = CHROMATIC_SCALE.indexOf(root)
  const newIndex = (rootIndex + interval) % CHROMATIC_SCALE.length
  return CHROMATIC_SCALE[newIndex]
}

export function getChord(
  root: Note,
  mode: Mode,
  degree: Degree,
  chordStructure: ChordStructure,
): Note[] {
  const degreeIndex = ORDERED_DEGREES.indexOf(degree)
  const scaleIntervals = MODE_INTERVALS[mode]
  const rootInterval = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const tonic = transpose(root, rootInterval)

  const chordStructureDefinition = CHORD_STRUCTURE_DEFINITIONS[chordStructure]
  const chordNotes = []
  for (const orderedNote of chordStructureDefinition) {
    chordNotes.push(transpose(tonic, getScaleInterval(scaleIntervals, 0, orderedNote)))
  }

  return chordNotes
}

export function getEligibleChordQualities(chord: Note[]): ChordQuality[] {
  // todo: gérer les accords renversés
  const tonic = chord[0]
  const chordIntervals = []
  for (let i = 0; i < chord.length; i++) {
    chordIntervals.push(getNoteInterval(tonic, chord[i]))
  }

  const eligibleChordQualities = []
  for (const chordQuality in CHORD_QUALITY_DEFINITIONS) {
    /**
     * todo: structureDefinition: mandatory/optional ?
     */
    if (CHORD_QUALITY_DEFINITIONS[chordQuality].length === chordIntervals.length && CHORD_QUALITY_DEFINITIONS[chordQuality].every(interval => chordIntervals.includes(interval))) {
      eligibleChordQualities.push(chordQuality)
    }
  }

  return eligibleChordQualities
}
