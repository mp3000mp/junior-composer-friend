<script setup lang="ts">
import { ORDERED_DEGREES, type Degree } from '@/music/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Degree
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: Degree) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="degree in ORDERED_DEGREES" :key="degree" :value="degree">{{ degree }}</option>
  </select>
</template>
