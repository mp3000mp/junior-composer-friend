import type { FullChromaticNote } from '@/music/types'
import { Alteration } from '@/music/types'

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
}
