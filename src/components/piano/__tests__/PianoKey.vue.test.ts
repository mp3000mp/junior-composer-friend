import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component, { type PianoKeyProps } from '@/components/piano/PianoKey.vue'
import { mount } from '@vue/test-utils'
import { makeNote } from '../../../test-utils'

let playerMock: { playNote: ReturnType<typeof vi.fn> }
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
}))

describe('PianoKey.vue', () => {
  let defaultProps: PianoKeyProps
  beforeEach(() => {
    defaultProps = {
      isBlack: false,
      isHighlighted: false,
      isPlayed: false,
      isChordRoot: false,
      isScaleRoot: false,
      note: makeNote('C'),
      octave: 4,
    }
    playerMock = {
      playNote: vi.fn(),
    }
  })

  test('should not show note', () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
    })
    expect(wrapper.text()).toBe('')
  })

  test('should show note', () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps, isPlayed: true },
    })
    expect(wrapper.text()).toBe('C')
  })

  test('should play note', async () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
    })
    const parent = wrapper.find('div')
    await parent.trigger('click')
    await parent.trigger('click')
    expect(playerMock.playNote).toHaveBeenCalledTimes(2)
  })
})
