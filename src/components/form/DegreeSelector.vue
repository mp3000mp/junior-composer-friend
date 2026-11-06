<script setup lang="ts">
import { ORDERED_DEGREES, type NaturalDegree } from '@/music/scale/types'

const model = defineModel<NaturalDegree>({ required: true })
</script>

<template>
  <div class="btn-group" role="group" aria-label="Scale degree">
    <button
      v-for="degree in ORDERED_DEGREES"
      :key="degree"
      type="button"
      class="btn btn-outline-primary"
      :class="{ active: model === degree }"
      @click="model = degree"
    >
      {{ degree }}
    </button>
  </div>
</template>
