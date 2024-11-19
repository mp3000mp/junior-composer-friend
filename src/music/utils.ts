import {
  BASE_A_FREQUENCY,
  type Chord,
  CHROMATIC_NOTES_INDICES,
  CHROMATIC_SCALE,
  ENHARMONIC_EQUIVALENTS,
  type FullChromaticNote,
  type SharpNote
} from '@/music/types'

export function computeFrequency(note: FullChromaticNote, octave: number): number {
  const octaveRatio = Math.pow(2, octave - 4)
  const aFrequency = BASE_A_FREQUENCY * octaveRatio
  const aIndex = CHROMATIC_SCALE.indexOf('A')
  const noteIndex = CHROMATIC_NOTES_INDICES[note]
  const semitoneOffset = noteIndex - aIndex

  return Math.round(aFrequency * Math.pow(2, semitoneOffset / 12))
}

export function getFullChromaticNote(modeRoot: SharpNote, note: SharpNote): FullChromaticNote {
  const sharpScale = CHROMATIC_SCALE;
  const flatScale = [...CHROMATIC_SCALE].map((n) =>
    ENHARMONIC_EQUIVALENTS[n] ? ENHARMONIC_EQUIVALENTS[n] : n
  )

  const rootIndexSharp = sharpScale.indexOf(modeRoot);
  const rootIndexFlat = flatScale.indexOf(modeRoot);

  const noteIndexSharp = sharpScale.indexOf(note);
  const noteIndexFlat = flatScale.indexOf(note);

  const sharpDistance = Math.abs(noteIndexSharp - rootIndexSharp);
  const flatDistance = Math.abs(noteIndexFlat - rootIndexFlat);

  return sharpDistance <= flatDistance ? note : flatScale[noteIndexSharp];
}

export function getSharpNote(note: FullChromaticNote): SharpNote {
  if (note.indexOf('b') < 0) {
    return note
  }
  return ENHARMONIC_EQUIVALENTS[note]
}

export function transposeNote(baseNote: SharpNote, interval: number): SharpNote {
  const rootIndex = CHROMATIC_SCALE.indexOf(baseNote)
  const newIndex = (rootIndex + interval) % CHROMATIC_SCALE.length
  return CHROMATIC_SCALE[newIndex]
}

export function transposeChord(chord: Chord, interval: number): Chord {
  return chord.map((note) => transposeNote(note, interval))
}
