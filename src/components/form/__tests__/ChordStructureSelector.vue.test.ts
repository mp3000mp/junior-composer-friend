import { describe, expect, test } from 'vitest'
import Component from '@/components/form/ChordStructureSelector.vue'
import { mount } from '@vue/test-utils'
import { ChordStructure } from '../../../music/types'

describe('ChordStructureSelector.vue', () => {
  test('should show ChordStructureSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: ChordStructure.Tetrad,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
