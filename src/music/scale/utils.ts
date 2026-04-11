import { type Alteration, type Note } from '@/music/types'

export function chooseScaleAlteration(
  scaleRootNote: Note,
  // scaleIntervals: ScaleIntervals,
): Alteration {
  if (scaleRootNote.alteration === '') {
    // todo avoid duplicate raw note ?
    return ''
  }
  return scaleRootNote.alteration
}
