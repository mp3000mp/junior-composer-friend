import { beforeEach, describe, expect, test, vi } from 'vitest'
import { usePlayer } from '@/music/player'
import { makeNote } from '../../test-utils'

vi.mock('smplr', () => ({
  SplendidGrandPiano: vi.fn(),
}))

describe('player.ts', () => {
  let mockStart: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    mockStart = vi.fn()
    const { SplendidGrandPiano } = await import('smplr')
    vi.mocked(SplendidGrandPiano).mockImplementation(
      function () {
        return { start: mockStart }
      } as any,
    )

    const player = usePlayer()
    player.isInitialized = false
    player.piano = null
    player.context = null

    vi.stubGlobal(
      'AudioContext',
      class {
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
    expect(mockStart).toHaveBeenCalledTimes(2)
    expect(mockStart).toHaveBeenCalledWith(expect.objectContaining({ note: 69 })) // A4
  })

  test('should play chord', () => {
    const player = usePlayer()
    player.playChord([makeNote('A'), makeNote('C'), makeNote('E')], 100)
    expect(mockStart).toHaveBeenCalledTimes(3)
    expect(mockStart).toHaveBeenNthCalledWith(1, expect.objectContaining({ note: 69 })) // A4
    expect(mockStart).toHaveBeenNthCalledWith(2, expect.objectContaining({ note: 72 })) // C5
    expect(mockStart).toHaveBeenNthCalledWith(3, expect.objectContaining({ note: 76 })) // E5
  })
})
