<script setup lang="ts">
import { ORDERED_DEGREES, type NaturalDegree } from '@/music/scale/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: NaturalDegree
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: NaturalDegree) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="degree in ORDERED_DEGREES" :key="degree" :value="degree">{{ degree }}</option>
  </select>
</template>
