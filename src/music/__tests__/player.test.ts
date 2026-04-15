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

  let mockGainNode: {
    connect: ReturnType<typeof vi.fn>
    gain: { value: number }
  }

  beforeEach(() => {
    usePlayer().isInitialized = false
    mockGainNode = {
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
      class {
        createGain() {
          return mockGainNode
        }
        createOscillator() {
          return mockOscillatorNode
        }
        get currentTime() {
          return 0
        }
      },
    )
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
