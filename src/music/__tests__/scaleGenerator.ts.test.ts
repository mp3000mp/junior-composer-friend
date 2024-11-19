import { describe, expect, test } from 'vitest'
import { generateScaleFromMode } from '../scaleGenerator'
import { Mode, SharpNote, Scale } from '../types'

describe('music/scaleGenerator.ts', () => {
  const generateScaleFromModeTestCases: {
    modeRoot: SharpNote
    mode: Mode
    expected: Scale
  }[] = [
    {
      modeRoot: 'A',
      mode: Mode.Aeolian,
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
    {
      modeRoot: 'F',
      mode: Mode.Ionian,
      expected: ["F", "G", "A", "Bb", "C", "D", "E"],
    },
  ]
  generateScaleFromModeTestCases.forEach(({ modeRoot, mode, expected }) => {
    test('generateScaleFromMode with ' + modeRoot + ' ' + mode, () => {
      const result = generateScaleFromMode(modeRoot, mode)
      expect(result).toEqual(expected)
    })
  })
})
