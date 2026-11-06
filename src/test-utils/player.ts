import { vi } from 'vitest'

export type PlayerMock = {
  playMidi?: ReturnType<typeof vi.fn>
  playChord?: ReturnType<typeof vi.fn>
  setVolume?: ReturnType<typeof vi.fn>
  preload?: ReturnType<typeof vi.fn>
}

export function createPlayerMock(playerMock: PlayerMock): PlayerMock {
  return {
    playMidi: vi.fn(),
    playChord: vi.fn(),
    setVolume: vi.fn(),
    preload: vi.fn(),
    ...playerMock,
  }
}
