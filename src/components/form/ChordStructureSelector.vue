<script setup lang="ts">
import { ChordStructureEnum, ChordStructureLabels } from '@/music/chord/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: ChordStructureEnum
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: ChordStructureEnum) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option
      v-for="value in Object.values(ChordStructureEnum)"
      :key="value"
      :value="value"
    >
      {{ ChordStructureLabels[value] }}
    </option>
  </select>
</template>
