import type { ScaleIntervals } from '@/music/types'
import { ModeEnum, MODE_INTERVALS } from '@/music/scale/types'

// todo scale, similarité ? pondérée ? without root ?
export function getEligibleModesFromIntervals(intervals: ScaleIntervals): ModeEnum[] {
  const eligibleModes: ModeEnum[] = []
  const intervalStr = intervals.join('')
  for (const mode in MODE_INTERVALS) {
    if (MODE_INTERVALS[mode].join('') === intervalStr) {
      eligibleModes.push(mode)
    }
  }

  return eligibleModes
}
