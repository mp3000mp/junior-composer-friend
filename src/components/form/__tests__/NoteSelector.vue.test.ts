import { describe, expect, test } from 'vitest'
import Component from '@/components/form/NoteSelector.vue'
import { mount } from '@vue/test-utils'
import { makeNote } from '../../../test-utils'

describe('NoteSelector.vue', () => {
  test('should show NoteSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: makeNote('E'),
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
