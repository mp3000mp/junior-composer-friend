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

export function getEligibleScalesFromNotes(
  notes: FullChromaticNote[],
  root: FullChromaticNote | null = null,
): EligibleScale[] {
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
  const eligibleRootScales = root === null ? SHARP_CHROMATIC_SCALE : [root]
  for (const rootScale of eligibleRootScales) {
    for (const scale of Object.keys(SCALE_INTERVALS)) {
      let matchingScore = 0
      const scaleNotes = generateScaleFromIntervals(rootScale, SCALE_INTERVALS[scale])
      for (const eligibleNote of eligibleNotes) {
        if (scaleNotes.includes(eligibleNote.note)) {
          matchingScore += eligibleNote.weight
        }
      }
      const similarity = Math.round((matchingScore / notes.length) * 100) / 100
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
      }
      eligibleScales.push({ rootScale, scale, scaleNotes, similarity })
    }
  }

  return eligibleScales
    .filter((es) => (maxSimilarity === 1 ? es.similarity === 1 : es.similarity > 0.75))
    .map((es) => ({ rootScale: es.rootScale, scale: es.scale, similarity: es.similarity }))
    .sort((a, b) => b.similarity - a.similarity)
}
