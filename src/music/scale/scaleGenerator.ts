import { type Note } from '@/music/types'
import { type Scale, type ScaleIntervals } from '@/music/scale/types'
import { transposeNoteByInterval } from '@/music/utils'

export function generateScaleFromIntervals(scaleRootNote: Note, intervals: ScaleIntervals): Scale {
  const scale: Scale = [scaleRootNote]
  let currentNote = scaleRootNote
  for (let i = 0; i < intervals.length - 1; i++) {
    currentNote = transposeNoteByInterval(currentNote, {
      diatonicSteps: 1,
      semitones: intervals[i],
    })
    scale.push(currentNote)
  }

  return scale
}
