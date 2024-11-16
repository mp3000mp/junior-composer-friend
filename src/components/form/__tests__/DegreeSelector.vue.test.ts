import { describe, expect, test } from 'vitest'
import Component from '@/components/form/DegreeSelector.vue'
import { mount } from '@vue/test-utils'

describe('DegreeSelector.vue', () => {
  test('should show DegreeSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: 'III',
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
