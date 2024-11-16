import { describe, expect, test } from 'vitest'
import Component from '@/components/form/ModeSelector.vue'
import { mount } from '@vue/test-utils'
import { Mode } from '../../../music/types'

describe('ModeSelector.vue', () => {
  test('should show ModeSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: Mode.Dorian,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
