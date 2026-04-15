import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component from '@/views/HomePage.vue'
import { mount } from '@vue/test-utils'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

const stubs = ['font-aw']

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
}))

describe('HomePage.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playNote: vi.fn(),
    })
  })

  test('should show home page', () => {
    const wrapper = mount(Component, {
      global: {
        stubs,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
