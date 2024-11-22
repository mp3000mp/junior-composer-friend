import { describe, expect, test } from 'vitest'
import Component from '@/components/form/ModeSelector.vue'
import { mount } from '@vue/test-utils'
import { ModeEnum } from '@/music/scale/types'

describe('ModeSelector.vue', () => {
  test('should show ModeSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: ModeEnum.Dorian,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
