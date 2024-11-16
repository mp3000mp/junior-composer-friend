import type { ScaleIntervals } from '@/music/types'
import { Mode, MODE_INTERVALS } from '@/music/types'

// todo similarité ? pondérée ?
export function getEligibleModesFromIntervals(intervals: ScaleIntervals): Mode[] {
  const eligibleModes: Mode[] = []
  for (const mode in MODE_INTERVALS) {
    if (MODE_INTERVALS[mode].join('') === intervals.join('')) {
      eligibleModes.push(mode)
    }
  }

  return eligibleModes
}
