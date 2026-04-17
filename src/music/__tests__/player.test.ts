import { beforeEach, describe, expect, test, vi } from 'vitest'
import { usePlayer } from '@/music/player'
import { makeNote } from '../../test-utils'

describe('player.ts', () => {
  const HARMONICS_COUNT = 5

  let mockOscillatorNode: {
    type: OscillatorType
    connect: ReturnType<typeof vi.fn>
    frequency: { setValueAtTime: ReturnType<typeof vi.fn> }
    start: ReturnType<typeof vi.fn>
    stop: ReturnType<typeof vi.fn>
  }

  let mockGainNode: {
    connect: ReturnType<typeof vi.fn>
    gain: {
      value: number
      setValueAtTime: ReturnType<typeof vi.fn>
      linearRampToValueAtTime: ReturnType<typeof vi.fn>
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
    }
  }

  let mockFilterNode: {
    type: BiquadFilterType
    connect: ReturnType<typeof vi.fn>
    frequency: {
      setValueAtTime: ReturnType<typeof vi.fn>
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
    }
    Q: { value: number }
  }

  beforeEach(() => {
    usePlayer().isInitialized = false
    mockGainNode = {
      connect: vi.fn(),
      gain: {
        value: 1,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    }
    mockOscillatorNode = {
      type: 'sine',
      connect: vi.fn(),
      frequency: { setValueAtTime: vi.fn() },
      start: vi.fn(),
      stop: vi.fn(),
    }
    mockFilterNode = {
      type: 'lowpass',
      connect: vi.fn(),
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      Q: { value: 1 },
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
        createBiquadFilter() {
          return mockFilterNode
        }
        createDynamicsCompressor() {
          return { connect: vi.fn() }
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
    expect(mockOscillatorNode.start).toHaveBeenCalledTimes(2 * HARMONICS_COUNT)
    expect(mockOscillatorNode.stop).toHaveBeenCalledTimes(2 * HARMONICS_COUNT)
  })

  test('should play chord', () => {
    const player = usePlayer()
    player.playChord([makeNote('A'), makeNote('C'), makeNote('E')], 100)
    expect(mockOscillatorNode.start).toHaveBeenCalledTimes(3 * HARMONICS_COUNT)
    expect(mockOscillatorNode.stop).toHaveBeenCalledTimes(3 * HARMONICS_COUNT)
  })
})
