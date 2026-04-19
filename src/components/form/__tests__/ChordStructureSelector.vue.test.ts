import { describe, expect, test } from 'vitest'
import Component from '@/components/form/ChordStructureSelector.vue'
import { mount } from '@vue/test-utils'
import { ChordStructureEnum } from '@/music/chord/types'

describe('ChordStructureSelector.vue', () => {
  test('should show ChordStructureSelector component', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: ChordStructureEnum.Tetrad,
      },
    })
    expect(wrapper).toBeTruthy()
  })
})
