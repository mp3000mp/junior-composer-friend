import { describe, expect, test } from 'vitest'
import Component from '@/views/CustomChordForm.vue'
import { mount } from '@vue/test-utils'

describe('CustomChordForm.vue', () => {
  test('should show CustomChordForm component', () => {
    const wrapper = mount(Component)
    expect(wrapper).toBeTruthy()
  })
})
