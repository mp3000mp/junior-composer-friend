import {
  Chord,
  CHORD_QUALITY_DEFINITIONS,
  ChordQuality,
  CHROMATIC_SCALE,
  SharpNote,
} from '@/music/types'

function getNoteInterval(fromNote: SharpNote, toNote: SharpNote): number {
  const fromIndex = CHROMATIC_SCALE.indexOf(fromNote)
  const toIndex = CHROMATIC_SCALE.indexOf(toNote)
  if (fromIndex <= toIndex) {
    return toIndex - fromIndex
  }
  return toIndex - fromIndex + CHROMATIC_SCALE.length
}

export function getEligibleChordQualities(chord: Chord): ChordQuality[] {
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
    if (
      CHORD_QUALITY_DEFINITIONS[chordQuality].length === chordIntervals.length &&
      CHORD_QUALITY_DEFINITIONS[chordQuality].every((interval) => chordIntervals.includes(interval))
    ) {
      eligibleChordQualities.push(chordQuality)
    }
  }

  return eligibleChordQualities
}
