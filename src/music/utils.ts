import {
  type NoteLetter,
  type Alteration,
  type Note,
  type NoteString,
  NOTE_LETTERS,
  LETTER_INTERVALS_FROM_C,
  ALTERATION_INTERVALS,
  SEMITONES_PER_OCTAVE,
  WHOLE_TONE_LETTERS,
} from '@/music/types'
import { type Chord, Interval } from '@/music/chord/types'
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
    intervalDiff = -1 * (SEMITONES_PER_OCTAVE - intervalDiff)
  }
  const alterationChar = intervalDiff > 0 ? '#' : 'b'
  return Array(Math.abs(intervalDiff)).fill(alterationChar).join('')
}

// Convertit un index de demi-ton (0-11) en note
export function indexToNote(index: number): Note {
  let semitoneCount = 0
  let letterIndex = 0

  // Trouver la lettre de base en parcourant les lettres
  while (
    letterIndex < NOTE_LETTERS.length &&
    semitoneCount + (WHOLE_TONE_LETTERS[NOTE_LETTERS[letterIndex]] ? 2 : 1) <= index
  ) {
    semitoneCount += WHOLE_TONE_LETTERS[NOTE_LETTERS[letterIndex]] ? 2 : 1
    letterIndex++
  }

  const letter = NOTE_LETTERS[letterIndex % NOTE_LETTERS.length]
  const remainingSemitones = index - semitoneCount

  // Calculer l'altération (# si demi-ton supplémentaire)
  const alteration = remainingSemitones === 1 ? '#' : ''

  return { letter, alteration }
}

export function transposeNote(baseNote: Note, interval: number): Note {
  const rootIndex =
    LETTER_INTERVALS_FROM_C[baseNote.letter] + ALTERATION_INTERVALS[baseNote.alteration]
  const newIndex = (rootIndex + interval) % SEMITONES_PER_OCTAVE
  // todo force alteration ?
  return indexToNote(newIndex)
}

export function transposeNoteByInterval(note: Note, interval: Interval): Note {
  const newLetter =
    NOTE_LETTERS[
      NOTE_LETTERS.indexOf(note.letter) +
        ((interval.diatonicSteps % NOTE_LETTERS.length) % NOTE_LETTERS.length)
    ]
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
