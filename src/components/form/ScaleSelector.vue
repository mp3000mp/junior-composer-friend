<script setup lang="ts">
import { ScaleEnum, ScaleLabels } from '@/music/scale/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: ScaleEnum
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: ScaleEnum) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="mode in Object.values(ScaleEnum)" :key="mode" :value="mode">{{ ScaleLabels[mode] }}</option>
  </select>
</template>
