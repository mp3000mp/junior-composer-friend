import { describe, expect, test } from 'vitest'
import Component from '../ScaleSelector.vue'
import { mount } from '@vue/test-utils'
import { ScaleEnum } from '@/music/scale/types'

describe('ModeSelector.vue', () => {
  test('should show ModeSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: ScaleEnum.Dorian,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
