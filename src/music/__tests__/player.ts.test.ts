import { beforeEach, describe, expect, test, vi } from 'vitest'
import { usePlayer } from '@/music/player'

describe('player.ts', () => {
  beforeEach(() => {
    usePlayer().isInitialized = false
    const gainNode = {
      connect: vi.fn(),
      gain: { value: 1 },
    }
    const oscillatorNode = {
      connect: vi.fn(),
      frequency: {
        setTargetAtTime: vi.fn(),
      },
      start: vi.fn(),
      stop: vi.fn(),
    }
    vi.stubGlobal(
      'AudioContext',
      vi.fn(function () {
        return {
          createGain: () => gainNode,
          createOscillator: vi.fn(() => oscillatorNode),
        }
      }),
    )
    window.GainNode = gainNode
    window.OscillatorNode = oscillatorNode
  })

  test('should play notes', () => {
    const player = usePlayer()
    player.playNote('A', 4, 100)
    player.playNote('A', 4, 100)
    expect(window.OscillatorNode.start).toHaveBeenCalledTimes(2)
    expect(window.OscillatorNode.stop).toHaveBeenCalledTimes(2)
  })

  test('should play chord', () => {
    const player = usePlayer()
    player.playChord(['A', 'C', 'E'], 100)
    expect(window.OscillatorNode.start).toHaveBeenCalledTimes(3)
    expect(window.OscillatorNode.stop).toHaveBeenCalledTimes(3)
  })
})
