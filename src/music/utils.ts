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
import { type Chord, type Interval } from '@/music/chord/types'
import { BASE_OCTAVE, KEYBOARD_MIDI_MAX, KEYBOARD_MIDI_MIN } from '@/music/player/types'

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
  else if (alterationSemitones < -2) alterationSemitones += SEMITONES_PER_OCTAVE
  if (alterationSemitones > 2 || alterationSemitones < -2) {
    return { letter: newLetter, alteration: '' as Alteration }
  }
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

/**
 * Semitones from the C of the same written octave. Not normalized:
 * Cb gives -1 and B# gives 12. Use getPitchClass to compare sounds.
 */
export function getIntervalFromC(note: Note): number {
  return LETTER_INTERVALS_FROM_C[note.letter] + ALTERATION_INTERVALS[note.alteration]
}

/** Pitch class in [0, 11]: enharmonic notes (Cb / B, B# / C) share the same value. */
export function getPitchClass(note: Note): number {
  return (
    ((getIntervalFromC(note) % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) % SEMITONES_PER_OCTAVE
  )
}

export function noteAreEquals(noteA: Note, noteB: Note): boolean {
  return getPitchClass(noteA) === getPitchClass(noteB)
}

/** MIDI number of a note in its written octave (Cb5 = B4 = 71, B#4 = C5 = 72). */
export function noteToMidi(note: Note, octave: number): number {
  return (octave + 1) * SEMITONES_PER_OCTAVE + getIntervalFromC(note)
}

/**
 * Places a chord on the keyboard: the root in BASE_OCTAVE, each following note
 * strictly above the previous one. The whole chord is moved one octave down
 * when it would go past the top of the keyboard.
 * Shared by the player and the piano layout so that what is shown is what is heard.
 */
export function chordToMidi(chord: Chord): number[] {
  const midis: number[] = []
  for (const note of chord) {
    if (midis.length === 0) {
      midis.push(noteToMidi(note, BASE_OCTAVE))
      continue
    }
    const previous = midis[midis.length - 1]
    const distance =
      (getPitchClass(note) - (previous % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) %
      SEMITONES_PER_OCTAVE
    midis.push(previous + (distance === 0 ? SEMITONES_PER_OCTAVE : distance))
  }

  if (
    midis.length > 0 &&
    midis[midis.length - 1] > KEYBOARD_MIDI_MAX &&
    midis[0] - SEMITONES_PER_OCTAVE >= KEYBOARD_MIDI_MIN
  ) {
    return midis.map((midi) => midi - SEMITONES_PER_OCTAVE)
  }
  return midis
}
