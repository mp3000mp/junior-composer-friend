import { vi } from 'vitest'

export type PlayerMock = {
  playNote?: ReturnType<typeof vi.fn>
  playChord?: ReturnType<typeof vi.fn>
  setVolume?: ReturnType<typeof vi.fn>
  initialize?: ReturnType<typeof vi.fn>
}

export function createPlayerMock(playerMock: PlayerMock) {
  return playerMock
}
