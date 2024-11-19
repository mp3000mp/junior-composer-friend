import type { SharpNote, Scale } from '@/music/types'
import { Mode, MODE_INTERVALS } from '@/music/types'
import { getFullChromaticNote, transposeNote } from '@/music/utils'

export function generateScaleFromMode(modeRoot: SharpNote, mode: Mode): Scale {
  const scaleIntervals = MODE_INTERVALS[mode]
  const scale: Scale = []
  let cursorInterval = 0
  for (const interval of scaleIntervals) {
    scale.push(getFullChromaticNote(modeRoot, transposeNote(modeRoot, cursorInterval)))
    cursorInterval += interval
  }

  return scale
}
