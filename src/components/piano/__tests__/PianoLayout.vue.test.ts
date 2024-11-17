import { describe, expect, test } from 'vitest'
import Component from '@/components/piano/PianoLayout.vue'
import PianoKey from '@/components/piano/PianoKey.vue'
import { mount } from '@vue/test-utils'

describe('PianoLayout.vue', () => {
  test('should show three octaves', () => {
    const wrapper = mount(Component, {
      props: {
        chordRoot: 'C',
        scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        chord: ['D', 'F', 'A'],
      },
    })
    const pianoKeys = wrapper.findAllComponents(PianoKey)
    expect(pianoKeys.length).toBe(36)
  })
})
