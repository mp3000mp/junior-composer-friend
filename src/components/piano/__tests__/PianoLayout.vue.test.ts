import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component, { type PianoLayoutProp } from '@/components/piano/PianoLayout.vue'
import PianoKey from '@/components/piano/PianoKey.vue'
import { mount } from '@vue/test-utils'
import { makeNote } from '../../../test-utils'

const stubs = ['font-aw']

let playerMock: { playChord: ReturnType<typeof vi.fn> }
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
}))

describe('PianoLayout.vue', () => {
  let defaultProps: PianoLayoutProp
  beforeEach(() => {
    defaultProps = {
      chordRoot: makeNote('C'),
      scale: [
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
        makeNote('F'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B'),
      ],
      chord: [makeNote('D'), makeNote('F'), makeNote('A')],
    }
    playerMock = {
      playChord: vi.fn(),
    }
  })

  test('should show three octaves', () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
      global: {
        stubs,
      },
    })
    const pianoKeys = wrapper.findAllComponents(PianoKey)
    expect(pianoKeys.length).toBe(36)
  })

  test('should trigger events', async () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
      global: {
        stubs,
      },
    })
    const icons = wrapper.findAll('font-aw-stub')
    expect(icons.length).toBe(3)
    await icons[0].trigger('click')
    expect(playerMock.playChord).toHaveBeenCalledTimes(1)
    await icons[1].trigger('click')
    expect(playerMock.playChord).toHaveBeenCalledTimes(2)
  })
})
