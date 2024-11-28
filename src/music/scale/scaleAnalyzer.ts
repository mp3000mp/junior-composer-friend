import type { ScaleIntervals } from '@/music/types'
import { ScaleEnum, SCALE_INTERVALS } from '@/music/scale/types'

// todo scale, similarité ? pondérée ? without root ?
export function getEligibleModesFromIntervals(intervals: ScaleIntervals): ScaleEnum[] {
  const eligibleModes: ScaleEnum[] = []
  const intervalStr = intervals.join('')
  for (const mode in SCALE_INTERVALS) {
    if (SCALE_INTERVALS[mode].join('') === intervalStr) {
      eligibleModes.push(mode)
    }
  }

  return eligibleModes
}
