import { type Note, SEMITONES_PER_OCTAVE } from '@/music/types'
import { ScaleEnum, SCALE_INTERVALS } from '@/music/scale/types'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { indexToNote, noteAreEquals } from '@/music/utils'

type EligibleScaleNote = {
  note: Note
  weight: number
}
type EligibleScale = {
  rootScale: Note
  scale: ScaleEnum
  similarity: number
}

export function getEligibleScalesFromNotes(notes: Note[], root: Note | null): EligibleScale[] {
  const eligibleNotes: EligibleScaleNote[] = []
  for (const note of notes) {
    let eligibleNote = eligibleNotes.find((en) => noteAreEquals(en.note, note))
    if (!eligibleNote) {
      eligibleNote = { note, weight: 0 }
      eligibleNotes.push(eligibleNote)
    }
    eligibleNote.weight++
  }

  let maxSimilarity = 0
  const eligibleScales: EligibleScale[] = []
  const eligibleRootScales =
    root === null ? Array.from({ length: SEMITONES_PER_OCTAVE }, (_, i) => indexToNote(i)) : [root]
  for (const rootScale of eligibleRootScales) {
    for (const scale of Object.keys(SCALE_INTERVALS) as ScaleEnum[]) {
      let matchingScore = 0
      const scaleNotes = generateScaleFromIntervals(rootScale, SCALE_INTERVALS[scale])
      for (const eligibleNote of eligibleNotes) {
        if (scaleNotes.some((en) => noteAreEquals(en, eligibleNote.note))) {
          matchingScore += eligibleNote.weight
        }
      }
      const similarity = Math.round((matchingScore / notes.length) * 100) / 100
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
      }
      eligibleScales.push({ rootScale, scale, similarity })
    }
  }

  return eligibleScales
    .filter((es) => (maxSimilarity === 1 ? es.similarity === 1 : es.similarity > 0.75))
    .map((es) => ({ rootScale: es.rootScale, scale: es.scale, similarity: es.similarity }))
    .sort((a, b) => b.similarity - a.similarity)
}
