import { describe, expect, test } from 'vitest'
import Component from '@/components/form/NoteSelector.vue'
import { mount } from '@vue/test-utils'
import { makeNote } from '../../../test-utils'

describe('NoteSelector.vue', () => {
  test('should show NoteSelector component', () => {
    const wrapper = mount(Component, {
      props: { modelValue: makeNote('E') },
    })
    expect(wrapper).toBeTruthy()
  })

  test('converts sharp note to flat equivalent when switching to flat mode', async () => {
    const wrapper = mount(Component, {
      props: { modelValue: makeNote('C', '#') },
    })
    await wrapper.find('#flatMode').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([makeNote('D', 'b')])
  })
})
