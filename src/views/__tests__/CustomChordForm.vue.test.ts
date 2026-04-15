import { beforeEach, describe, expect, test, vi } from 'vitest'
import Component from '@/views/CustomChordForm.vue'
import { mount } from '@vue/test-utils'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
}))

describe('CustomChordForm.vue', () => {
  beforeEach(() => {
    playerMock = createPlayerMock({
      playNote: vi.fn(),
    })
  })

  test('should show CustomChordForm component', () => {
    const wrapper = mount(Component)
    expect(wrapper).toBeTruthy()
  })
})
