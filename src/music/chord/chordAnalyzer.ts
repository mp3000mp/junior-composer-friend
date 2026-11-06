import { type Note, SEMITONES_PER_OCTAVE } from '@/music/types'
import { type Chord, CHORD_QUALITIES, ChordQualityEnum } from '@/music/chord/types'
import { getPitchClass } from '@/music/utils'

function getNotesInterval(fromNote: Note, toNote: Note): number {
  return (
    (getPitchClass(toNote) - getPitchClass(fromNote) + SEMITONES_PER_OCTAVE) % SEMITONES_PER_OCTAVE
  )
}

export function getEligibleChordQualities(chord: Chord): ChordQualityEnum[] {
  // todo: handle inverted chords
  const tonic = chord[0]
  const chordIntervals: number[] = []
  for (let i = 0; i < chord.length; i++) {
    chordIntervals.push(getNotesInterval(tonic, chord[i]))
  }

  const eligibleChordQualities = []
  for (const chordQuality of Object.keys(CHORD_QUALITIES) as ChordQualityEnum[]) {
    /**
     * todo: structureDefinition: mandatory/optional ?
     */
    if (
      CHORD_QUALITIES[chordQuality].length === chordIntervals.length &&
      CHORD_QUALITIES[chordQuality].every((interval) =>
        chordIntervals.includes(interval.semitones % SEMITONES_PER_OCTAVE),
      )
    ) {
      eligibleChordQualities.push(chordQuality)
    }
  }

  return eligibleChordQualities
}
