import { vi } from 'vitest'

// Mock AudioContext globally for all tests
vi.stubGlobal(
  'AudioContext',
  class {
    createGain() {
      return {
        connect: vi.fn(),
        gain: { value: 1 },
      }
    }
    createOscillator() {
      return {
        connect: vi.fn(),
        frequency: {
          setTargetAtTime: vi.fn(),
        },
        start: vi.fn(),
        stop: vi.fn(),
      }
    }
    get currentTime() {
      return 0
    }
  },
)
