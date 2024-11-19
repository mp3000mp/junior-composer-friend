import { describe, expect, test } from 'vitest'
import Component from '@/views/ModeDegreeForm.vue'
import { mount } from '@vue/test-utils'

const stubs = ['font-aw']

describe('ModeDegreeForm.vue', () => {
  test('should show ModeDegreeForm component', () => {
    const wrapper = mount(Component, {
      global: {
        stubs,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
