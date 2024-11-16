import { describe, expect, test } from 'vitest'
import Component from '@/views/HomePage.vue'
import { mount } from '@vue/test-utils'

describe('HomePage.vue', () => {
  test('should show home page', () => {
    const wrapper = mount(Component)
    expect(wrapper).toBeTruthy()
  })
})
