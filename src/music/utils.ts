import {
  SHARP_CHROMATIC_SCALE,
  type NoteLetter,
  type Alteration,
  type Note,
  type NoteString,
  NOTE_LETTERS,
  LETTER_INTERVALS_FROM_C,
  ALTERATION_INTERVALS,
} from '@/music/types'
import { type Chord } from '@/music/chord/types'
import { BASE_A_FREQUENCY } from '@/music/player/types'

// todo which temperament ?
export function computeFrequency(note: Note, octave: number): number {
  const octaveRatio = Math.pow(2, octave - 4)
  const aFrequency = BASE_A_FREQUENCY * octaveRatio
  const aIndex = LETTER_INTERVALS_FROM_C['A']
  const noteIndex = getIntervalFromC(note)
  const semitoneOffset = noteIndex - aIndex

  return Math.round(aFrequency * Math.pow(2, semitoneOffset / 12))
}

export function getAlteration(naturalNoteLetter: NoteLetter, intervalFromC: number): Alteration {
  const naturalIntervalFromC = getIntervalFromC({ letter: naturalNoteLetter, alteration: '' })
  let intervalDiff = intervalFromC - naturalIntervalFromC
  if (intervalDiff > 2) {
    intervalDiff = -1 * (SHARP_CHROMATIC_SCALE.length - intervalDiff)
  }
  const alterationChar = intervalDiff > 0 ? '#' : 'b'
  return Array(Math.abs(intervalDiff)).fill(alterationChar).join('')
}

export function transposeNote(baseNote: Note, interval: number): Note {
  const rootIndex =
    LETTER_INTERVALS_FROM_C[baseNote.letter] + ALTERATION_INTERVALS[baseNote.alteration]
  const newIndex = (rootIndex + interval) % SHARP_CHROMATIC_SCALE.length
  // todo force alteration ?
  return noteFromString(SHARP_CHROMATIC_SCALE[newIndex])
}

export function transposeChord(chord: Chord, interval: number): Chord {
  return chord.map((note) => transposeNote(note, interval))
}

export function noteToString(note: Note): NoteString {
  return note.letter + note.alteration
}

export function noteFromString(note: NoteString): Note {
  return {
    letter: note.charAt(0),
    alteration: note.substring(1),
  }
}

export function getIntervalFromC(note: Note): number {
  return LETTER_INTERVALS_FROM_C[note.letter] + ALTERATION_INTERVALS[note.alteration]
}

export function noteAreEquals(noteA: Note, noteB: Note): boolean {
  return getIntervalFromC(noteA) === getIntervalFromC(noteB)
}

export function nextLetter(letter: NoteLetter): NoteLetter {
  return NOTE_LETTERS[(NOTE_LETTERS.indexOf(letter) + 1) % NOTE_LETTERS.length]
}
