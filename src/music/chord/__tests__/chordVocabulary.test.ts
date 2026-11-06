import { describe, expect, test } from 'vitest'
import {
  type Interval,
  CHORD_QUALITIES,
  ChordQualityEnum,
  ChordQualityLabels,
} from '@/music/chord/types'
import {
  generateChordIntervalsFromCustomQuality,
  parseCustomQuality,
} from '@/music/chord/chordGenerator'
import { getEligibleChordQualities } from '@/music/chord/chordAnalyzer'

// The chord vocabulary lives in two places: QUALITY_RULES (notation parser) and
// CHORD_QUALITIES / ChordQualityLabels (chord naming). These tests keep them in sync.
const bySemitones = (intervals: Interval[]) =>
  [...intervals].sort((a, b) => a.semitones - b.semitones)

describe('chord vocabulary: parser and analyzer agree', () => {
  for (const quality of Object.values(ChordQualityEnum) as ChordQualityEnum[]) {
    const label = ChordQualityLabels[quality]

    test(`label "C${label}" parses to the ${quality} intervals`, () => {
      expect(bySemitones(generateChordIntervalsFromCustomQuality(label))).toEqual(
        bySemitones(CHORD_QUALITIES[quality]),
      )
    })

    test(`label "C${label}" is fully recognized by the parser`, () => {
      const { error, inputSegments } = parseCustomQuality(`C${label}`)
      expect(error).toBeNull()
      expect(inputSegments.filter((s) => s.ignored)).toEqual([])
    })

    test(`chord parsed from "C${label}" is named ${quality}`, () => {
      const { chord } = parseCustomQuality(`C${label}`)
      expect(getEligibleChordQualities(chord)).toContain(quality)
    })
  }
})
