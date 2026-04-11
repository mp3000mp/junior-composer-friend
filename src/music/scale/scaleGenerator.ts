import { type Note } from '@/music/types'
import { type Scale, type ScaleIntervals } from '@/music/scale/types'
import { getAlteration, getIntervalFromC, nextLetter } from '@/music/utils'

export function generateScaleFromIntervals(scaleRootNote: Note, intervals: ScaleIntervals): Scale {
  const scale: Scale = [scaleRootNote]
  let currentIntervalFromC = getIntervalFromC(scaleRootNote)
  let currentLetter = scaleRootNote.letter
  for (let i = 0; i < intervals.length - 1; i++) {
    currentIntervalFromC += intervals[i]
    currentLetter = nextLetter(currentLetter)
    scale.push({
      letter: currentLetter,
      alteration: getAlteration(currentLetter, currentIntervalFromC),
    })
  }

  return scale
}
