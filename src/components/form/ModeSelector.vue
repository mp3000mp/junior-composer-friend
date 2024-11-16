<script setup lang="ts">
import { Mode } from '@/music/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Mode
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: Mode) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="mode in Object.keys(Mode)" :key="mode" :value="mode">{{ mode }}</option>
  </select>
</template>
