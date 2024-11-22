<script setup lang="ts">
import { SHARP_CHROMATIC_SCALE, type SharpNote } from '@/music/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: SharpNote
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: SharpNote) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="note in SHARP_CHROMATIC_SCALE" :key="note" :value="note">{{ note }}</option>
  </select>
</template>
