import { describe, expect, test } from 'vitest'
import Component from '@/views/ModeDegreeForm.vue'
import { mount } from '@vue/test-utils'

describe('ModeDegreeForm.vue', () => {
  test('should show ModeDegreeForm component', () => {
    const wrapper = mount(Component)
    expect(wrapper).toBeTruthy()
  })
})
