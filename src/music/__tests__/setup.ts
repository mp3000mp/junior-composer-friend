import { vi } from 'vitest'

// Mock AudioContext globally for all tests
vi.stubGlobal(
  'AudioContext',
  class {
    get currentTime() {
      return 0
    }
  },
)
