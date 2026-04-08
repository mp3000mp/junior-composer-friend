import { type FullChromaticNote, type Alteration } from '@/music/types'

export function chooseScaleAlteration(
  scaleRoot: FullChromaticNote,
  // scaleIntervals: ScaleIntervals,
): Alteration {
  if (scaleRoot.indexOf('b')) {
    return 'b'
  }
  if (scaleRoot.indexOf('#')) {
    return '#'
  }
  // todo avoid duplicate raw note ?
  return ''
}
