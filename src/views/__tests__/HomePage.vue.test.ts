import { describe, expect, test } from 'vitest'
import Component from '@/views/HomePage.vue'
import { mount } from '@vue/test-utils'

const stubs = ['font-aw']

describe('HomePage.vue', () => {
  test('should show home page', () => {
    const wrapper = mount(Component, {
      global: {
        stubs,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
