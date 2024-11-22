<script setup lang="ts">
import { ModeEnum } from '@/music/scale/types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: ModeEnum
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: ModeEnum) => emit('update:modelValue', value),
})
</script>

<template>
  <select class="form-select" v-model="localValue">
    <option v-for="mode in Object.keys(ModeEnum)" :key="mode" :value="mode">{{ mode }}</option>
  </select>
</template>
