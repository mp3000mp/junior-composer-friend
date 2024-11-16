<script setup lang="ts">
import { CHROMATIC_SCALE, type Note } from '@/music/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Note
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: Note) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="note in CHROMATIC_SCALE" :key="note" :value="note">{{ note }}</option>
  </select>
</template>
