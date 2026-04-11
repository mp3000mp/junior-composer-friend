<script setup lang="ts">
import { SHARP_CHROMATIC_SCALE } from '@/music/types'
import { noteFromString, noteToString } from '@/music/utils'
import type { Note } from '@/music/types'
import { computed } from 'vue'

const model = defineModel<Note | null>({ required: true })

const stringValue = computed({
  get: () => (model.value ? noteToString(model.value) : null),
  set: (value) => {
    model.value = value ? noteFromString(value) : null
  },
})
</script>

<template>
  <select class="form-select" v-model="stringValue">
    <option v-for="note in SHARP_CHROMATIC_SCALE" :key="note" :value="note">{{ note }}</option>
  </select>
</template>
