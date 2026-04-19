import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component from '@/views/HomePage.vue'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

const stubs = ['font-aw']

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
  pianoLoadProgress: { value: null },
}))

describe('HomePage.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playNote: vi.fn(),
    })
  })

  test('should show home page', () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'home', component: Component }],
    })
    const wrapper = mount(Component, {
      global: {
        stubs,
        plugins: [router],
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
