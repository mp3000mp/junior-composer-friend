<script setup lang="ts">
import { ScaleEnum, ScaleLabels } from '@/music/scale/types'

const model = defineModel<ScaleEnum>({ required: true })
</script>

<template>
  <select class="form-select" v-model="model">
    <option v-for="scale in Object.values(ScaleEnum)" :key="scale" :value="scale">
      {{ ScaleLabels[scale] }}
    </option>
  </select>
</template>
