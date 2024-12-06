import { type FullChromaticNote, SHARP_CHROMATIC_SCALE } from '@/music/types'
import { ScaleEnum, SCALE_INTERVALS } from '@/music/scale/types'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'

type EligibleScaleNote = {
  note: FullChromaticNote
  weight: number
}
type EligibleScale = {
  rootScale: FullChromaticNote
  notes: FullChromaticNote[]
  similarity: number
}
type EligibleScaleCandidate = EligibleScale & {
  scale: ScaleEnum
}

export function getEligibleScalesFromNotes(notes: FullChromaticNote[]): EligibleScale[] {
  const eligibleNotes: EligibleScaleNote[] = []
  for (const note of notes) {
    let eligibleNote = eligibleNotes.find((en) => en.note === note)
    if (!eligibleNote) {
      eligibleNote = { note, weight: 0 }
      eligibleNotes.push(eligibleNote)
    }
    eligibleNote.weight++
  }

  let maxSimilarity = 0
  const eligibleScales: EligibleScaleCandidate[] = []
  for (const rootScale of SHARP_CHROMATIC_SCALE) {
    for (const scale of Object.keys(SCALE_INTERVALS)) {
      let matchingNotes = 0
      const scaleNotes = generateScaleFromIntervals(rootScale, SCALE_INTERVALS[scale])
      for (const eligibleNote of eligibleNotes) {
        if (scaleNotes.includes(eligibleNote.note)) {
          matchingNotes++
        }
      }
      const similarity = Math.round((matchingNotes / eligibleNotes.length) * 100) / 100
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
      }
      eligibleScales.push({ rootScale, scale, notes, similarity })
    }
  }

  return eligibleScales
    .filter((es) => es.similarity === maxSimilarity)
    .sort((a, b) => a.similarity < b.similarity)
    .map((es) => ({ rootScale: es.rootScale, scale: es.scale, similarity: es.similarity }))
}
