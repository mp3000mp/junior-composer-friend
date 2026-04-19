import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component from '@/views/CustomChordForm.vue'
import { mount } from '@vue/test-utils'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

const stubs = ['font-aw']

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
  pianoLoadProgress: { value: null },
}))

describe('CustomChordForm.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playNote: vi.fn(),
    })
  })

  test('should show CustomChordForm component', () => {
    const wrapper = mount(Component, { global: { stubs } })
    expect(wrapper).toBeTruthy()
  })
})
