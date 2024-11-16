<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Note } from '@/music/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import { generateChordFromCustomQuality } from '@/music/chordGenerator'

const customQuality = ref('')

const chord = computed(() => generateChordFromCustomQuality(customQuality.value))
const chordRoot = computed<Note | null>(() =>
  chord.value.length === 0 ? null : Array.from(chord.value)[0],
)
</script>

<template>
  <div>
    <input type="text" v-model="customQuality" />
    <piano-layout v-if="chordRoot" :chord="chord" :scale="[]" :chord-root="chordRoot" />
  </div>
</template>
