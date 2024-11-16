import { describe, expect, test } from 'vitest'
import Component from '@/components/form/NoteSelector.vue'
import { mount } from '@vue/test-utils'

describe('NoteSelector.vue', () => {
  test('should show NoteSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: 'E',
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
