import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'
import Component from '@/views/CustomChordForm.vue'
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

describe('CustomChordForm.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playMidi: vi.fn(),
    })
  })

  test('should show CustomChordForm component', () => {
    const wrapper = mount(Component, { global: { stubs } })
    expect(wrapper).toBeTruthy()
  })
})
