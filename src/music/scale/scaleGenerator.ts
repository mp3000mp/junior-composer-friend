import { type FullChromaticNote, NATURAL_CHROMATIC_SCALE } from '@/music/types'
import { type Scale, type ScaleIntervals } from '@/music/scale/types'
import { getAlteration, getNaturalNote, getSharpNote, transposeNote } from '@/music/utils'

export function generateScaleFromIntervals(
  scaleRoot: FullChromaticNote,
  intervals: ScaleIntervals,
): Scale {
  const scale: Scale = [scaleRoot]
  let currentNaturalNote = getNaturalNote(scaleRoot)
  let currentNaturalNoteIndex = NATURAL_CHROMATIC_SCALE.indexOf(currentNaturalNote)
  let currentFullChromaticNote = getSharpNote(scaleRoot)
  for (let i = 0; i < intervals.length - 1; i++) {
    const interval = intervals[i]
    currentFullChromaticNote = transposeNote(currentFullChromaticNote, interval)
    currentNaturalNoteIndex = (currentNaturalNoteIndex + 1) % NATURAL_CHROMATIC_SCALE.length
    currentNaturalNote = NATURAL_CHROMATIC_SCALE[currentNaturalNoteIndex]
    const alteration = getAlteration(currentNaturalNote, currentFullChromaticNote)
    scale.push(currentNaturalNote + alteration)
  }

  return scale
}
