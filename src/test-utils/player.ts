import { vi } from 'vitest'

export type PlayerMock = {
  playNote?: ReturnType<typeof vi.fn>
  playChord?: ReturnType<typeof vi.fn>
  setVolume?: ReturnType<typeof vi.fn>
  initEager?: ReturnType<typeof vi.fn>
}

export function createPlayerMock(playerMock: PlayerMock): PlayerMock {
  return {
    playNote: vi.fn(),
    playChord: vi.fn(),
    setVolume: vi.fn(),
    initEager: vi.fn(),
    ...playerMock,
  }
}
