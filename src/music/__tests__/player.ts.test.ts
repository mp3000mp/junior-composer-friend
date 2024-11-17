import { beforeEach, describe, expect, test, vi } from 'vitest'
import { usePlayer } from '../player'

describe('player.ts', () => {
  beforeEach(() => {
    window.GainNode = {
      connect: vi.fn(),
      gain: vi.fn(),
    }
    window.OscillatorNode = {
      connect: vi.fn(),
      frequency: {
        setTargetAtTime: vi.fn(),
      },
      start: vi.fn(),
      stop: vi.fn(),
    }
    window.AudioContext = vi.fn(() => ({
      createGain: () => window.GainNode,
      createOscillator: vi.fn(() => window.OscillatorNode),
    }))
  })

  test('should trigger sound', () => {
    const player = usePlayer()
    player.play('A', 4, 100)
    player.play('A', 4, 100)
    expect(window.OscillatorNode.start).toHaveBeenCalled(2)
    expect(window.OscillatorNode.stop).toHaveBeenCalled(2)
  })
})
