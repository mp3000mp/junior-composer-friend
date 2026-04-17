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
  <div class="btn-group" role="group" aria-label="Scale degree">
    <button
      v-for="degree in ORDERED_DEGREES"
      :key="degree"
      type="button"
      class="btn btn-outline-primary"
      :class="{ active: localValue === degree }"
      @click="localValue = degree"
    >
      {{ degree }}
    </button>
  </div>
</template>
