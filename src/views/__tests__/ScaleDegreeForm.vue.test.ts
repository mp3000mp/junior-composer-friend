import { describe, expect, test } from 'vitest'
import Component from '@/views/ScaleDegreeForm.vue'
import { mount } from '@vue/test-utils'

const stubs = ['font-aw']

describe('ScaleDegreeForm.vue', () => {
  test('should show ScaleDegreeForm component', () => {
    const wrapper = mount(Component, {
      global: {
        stubs,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
