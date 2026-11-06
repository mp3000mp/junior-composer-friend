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
    vi.mocked(SplendidGrandPiano).mockImplementation(function () {
      return { start: mockStart } as unknown as InstanceType<typeof SplendidGrandPiano>
    })

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
    player.playMidi(69, 100)
    player.playMidi(69, 100)
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

  test('should play Cb and B# at the right pitch', () => {
    const player = usePlayer()
    player.playChord([makeNote('A', 'b'), makeNote('C', 'b'), makeNote('E', 'b')], 100)
    expect(mockStart).toHaveBeenNthCalledWith(1, expect.objectContaining({ note: 68 })) // Ab4
    expect(mockStart).toHaveBeenNthCalledWith(2, expect.objectContaining({ note: 71 })) // Cb5 = B4
    expect(mockStart).toHaveBeenNthCalledWith(3, expect.objectContaining({ note: 75 })) // Eb5

    mockStart.mockClear()
    player.playChord([makeNote('G', '#'), makeNote('B', '#'), makeNote('D', '#')], 100)
    expect(mockStart).toHaveBeenNthCalledWith(1, expect.objectContaining({ note: 68 })) // G#4
    expect(mockStart).toHaveBeenNthCalledWith(2, expect.objectContaining({ note: 72 })) // B#4 = C5
    expect(mockStart).toHaveBeenNthCalledWith(3, expect.objectContaining({ note: 75 })) // D#5
  })
})
