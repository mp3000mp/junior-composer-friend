import {
  type Alteration,
  type NoteLetter,
  type Note,
  type NoteString,
  NOTE_LETTERS,
  LETTER_INTERVALS_FROM_C,
  ALTERATION_INTERVALS,
  SEMITONES_PER_OCTAVE,
  WHOLE_TONE_LETTERS,
} from '@/music/types'
import { Interval } from '@/music/chord/types'
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

export function indexToNote(index: number, preferFlats = false): Note {
  let semitoneCount = 0
  let letterIndex = 0

  while (
    letterIndex < NOTE_LETTERS.length &&
    semitoneCount + (WHOLE_TONE_LETTERS[NOTE_LETTERS[letterIndex]] ? 2 : 1) <= index
  ) {
    semitoneCount += WHOLE_TONE_LETTERS[NOTE_LETTERS[letterIndex]] ? 2 : 1
    letterIndex++
  }

  const remainingSemitones = index - semitoneCount

  if (remainingSemitones === 1 && preferFlats) {
    const letter = NOTE_LETTERS[(letterIndex + 1) % NOTE_LETTERS.length]
    return { letter, alteration: 'b' }
  }

  const letter = NOTE_LETTERS[letterIndex % NOTE_LETTERS.length]
  const alteration = remainingSemitones === 1 ? '#' : ''

  return { letter, alteration }
}

export function transposeNoteByInterval(note: Note, interval: Interval): Note {
  const newLetter =
    NOTE_LETTERS[(NOTE_LETTERS.indexOf(note.letter) + interval.diatonicSteps) % NOTE_LETTERS.length]
  const rootSemitones = getIntervalFromC(note)
  const targetSemitones = (rootSemitones + interval.semitones) % SEMITONES_PER_OCTAVE
  const naturalNewSemitones = LETTER_INTERVALS_FROM_C[newLetter]
  let alterationSemitones = targetSemitones - naturalNewSemitones
  if (alterationSemitones > 2) alterationSemitones -= SEMITONES_PER_OCTAVE
  if (alterationSemitones < -2) alterationSemitones += SEMITONES_PER_OCTAVE
  const alteration = (
    alterationSemitones === 0
      ? ''
      : Array(Math.abs(alterationSemitones))
          .fill(alterationSemitones > 0 ? '#' : 'b')
          .join('')
  ) as Alteration
  return { letter: newLetter, alteration }
}

export function noteToString(note: Note): NoteString {
  return (note.letter + note.alteration) as NoteString
}

export function noteFromString(note: NoteString): Note {
  return {
    letter: note.charAt(0) as NoteLetter,
    alteration: note.substring(1) as Alteration,
  }
}

export function getIntervalFromC(note: Note): number {
  return LETTER_INTERVALS_FROM_C[note.letter] + ALTERATION_INTERVALS[note.alteration]
}

export function noteAreEquals(noteA: Note, noteB: Note): boolean {
  return getIntervalFromC(noteA) === getIntervalFromC(noteB)
}
