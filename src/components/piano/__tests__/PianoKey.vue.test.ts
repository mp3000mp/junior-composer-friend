import { describe, expect, test } from 'vitest'
import Component from '@/components/piano/PianoKey.vue'
import { mount } from '@vue/test-utils'

const defaultProps = {
  isBlack: false,
  isHighlighted: false,
  isPlayed: false,
  isChordRoot: false,
  isScaleRoot: false,
  note: 'C',
}

describe('PianoKey.vue', () => {
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
})
