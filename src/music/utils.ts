import {
  FULL_CHROMATIC_NOTES_INDICES,
  SHARP_CHROMATIC_SCALE,
  ENHARMONIC_EQUIVALENTS,
  type FullChromaticNote,
  type SharpNote,
  type NaturalNote,
  type Alteration,
} from '@/music/types'
import { type Chord } from '@/music/chord/types'
import { BASE_A_FREQUENCY } from '@/music/player/types'

export function computeFrequency(note: FullChromaticNote, octave: number): number {
  const octaveRatio = Math.pow(2, octave - 4)
  const aFrequency = BASE_A_FREQUENCY * octaveRatio
  const aIndex = SHARP_CHROMATIC_SCALE.indexOf('A')
  const noteIndex = FULL_CHROMATIC_NOTES_INDICES[note]
  const semitoneOffset = noteIndex - aIndex

  return Math.round(aFrequency * Math.pow(2, semitoneOffset / 12))
}

export function getAlteration(
  naturalNote: NaturalNote,
  fullChromaticNote: FullChromaticNote,
): Alteration {
  const chromaticNoteCount = SHARP_CHROMATIC_SCALE.length
  let interval =
    (FULL_CHROMATIC_NOTES_INDICES[fullChromaticNote] -
      FULL_CHROMATIC_NOTES_INDICES[naturalNote] +
      chromaticNoteCount) %
    chromaticNoteCount
  if (interval > 2) {
    interval -= chromaticNoteCount
  }
  return ['bb', 'b', '', '#', '##'][interval + 2]
}

export function getNaturalNote(note: FullChromaticNote): NaturalNote {
  return Array.from(note).splice(0, 1)[0] as NaturalNote
}

export function getSharpNote(note: FullChromaticNote): SharpNote {
  if (note.indexOf('b') < 0) {
    return note
  }
  return ENHARMONIC_EQUIVALENTS[note]
}

export function transposeNote(baseNote: FullChromaticNote, interval: number): SharpNote {
  const rootIndex = FULL_CHROMATIC_NOTES_INDICES[baseNote]
  const newIndex = (rootIndex + interval) % SHARP_CHROMATIC_SCALE.length
  return SHARP_CHROMATIC_SCALE[newIndex]
}

export function transposeChord(chord: Chord, interval: number): Chord {
  return chord.map((note) => transposeNote(note, interval))
}
