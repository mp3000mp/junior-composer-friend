<script setup lang="ts">
import { ChordStructure } from '@/music/chord/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: ChordStructure
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: ChordStructure) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option
      v-for="chordStructure in Object.keys(ChordStructure)"
      :key="chordStructure"
      :value="chordStructure"
    >
      {{ chordStructure }}
    </option>
  </select>
</template>
