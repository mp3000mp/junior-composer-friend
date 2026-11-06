<script setup lang="ts">
import { ChordStructureEnum, ChordStructureLabels } from '@/music/chord/types'

const model = defineModel<ChordStructureEnum>({ required: true })
</script>

<template>
  <select class="form-select" v-model="model">
    <option v-for="value in Object.values(ChordStructureEnum)" :key="value" :value="value">
      {{ ChordStructureLabels[value] }}
    </option>
  </select>
</template>
