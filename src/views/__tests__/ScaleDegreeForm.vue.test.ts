import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'
import Component from '@/views/ScaleDegreeForm.vue'
import { mount } from '@vue/test-utils'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

const stubs = ['font-aw']

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
  pianoLoadProgress: ref(null),
  isPianoLoaded: ref(false),
  pianoLoadPercent: ref(0),
}))

describe('ScaleDegreeForm.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playMidi: vi.fn(),
    })
  })

  test('should show ScaleDegreeForm component', () => {
    const wrapper = mount(Component, {
      global: {
        stubs,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
