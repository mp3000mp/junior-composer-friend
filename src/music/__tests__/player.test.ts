import { beforeEach, describe, expect, test, vi } from 'vitest'
import { usePlayer } from '@/music/player'
import { makeNote } from '../../test-utils'

describe('player.ts', () => {
  let mockOscillatorNode: {
    connect: ReturnType<typeof vi.fn>
    frequency: { setTargetAtTime: ReturnType<typeof vi.fn> }
    start: ReturnType<typeof vi.fn>
    stop: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    usePlayer().isInitialized = false
    const gainNode = {
      connect: vi.fn(),
      gain: { value: 1 },
    }
    mockOscillatorNode = {
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
          createOscillator: vi.fn(() => mockOscillatorNode),
        }
      }),
    )
    vi.stubGlobal('GainNode', gainNode)
    vi.stubGlobal('OscillatorNode', mockOscillatorNode)
  })

  test('should play notes', () => {
    const player = usePlayer()
    player.playNote(makeNote('A'), 4, 100)
    player.playNote(makeNote('A'), 4, 100)
    expect(mockOscillatorNode.start).toHaveBeenCalledTimes(2)
    expect(mockOscillatorNode.stop).toHaveBeenCalledTimes(2)
  })

  test('should play chord', () => {
    const player = usePlayer()
    player.playChord([makeNote('A'), makeNote('C'), makeNote('E')], 100)
    expect(mockOscillatorNode.start).toHaveBeenCalledTimes(3)
    expect(mockOscillatorNode.stop).toHaveBeenCalledTimes(3)
  })
})
