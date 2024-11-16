import type { Note, Scale } from '@/music/types'
import { Mode, MODE_INTERVALS } from '@/music/types'
import { transposeNote } from '@/music/utils'

export function generateScaleFromMode(modeRoot: Note, mode: Mode): Scale {
  const scaleIntervals = MODE_INTERVALS[mode]
  const scale: Scale = []
  let cursorInterval = 0
  for (const interval of scaleIntervals) {
    scale.push(transposeNote(modeRoot, cursorInterval))
    cursorInterval += interval
  }

  return scale
}
