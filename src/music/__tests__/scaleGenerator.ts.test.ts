import { describe, expect, test } from 'vitest'
import { generateScaleFromMode } from '../scaleGenerator'
import { Mode, Note, Scale } from '../types'

describe('music/scaleGenerator.ts', () => {
  const generateScaleFromModeTestCases: {
    tonic: Note
    mode: Mode
    expected: Scale
  }[] = [
    {
      tonic: 'A',
      mode: Mode.Aeolian,
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    },
  ]
  generateScaleFromModeTestCases.forEach(({ tonic, mode, expected }) => {
    test('generateScaleFromMode with ' + tonic + ' ' + mode, () => {
      const result = generateScaleFromMode(tonic, mode)
      expect(result).toEqual(expected)
    })
  })
})
