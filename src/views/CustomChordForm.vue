<script setup lang="ts">
import { computed, ref } from 'vue'
import { type SharpNote } from '@/music/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import { generateChordFromCustomQuality } from '@/music/chord/chordGenerator'

const customQuality = ref('')

const chord = computed(() => generateChordFromCustomQuality(customQuality.value))
const chordRoot = computed<SharpNote | null>(() =>
  chord.value.length === 0 ? null : Array.from(chord.value)[0],
)
</script>

<template>
  <div class="container py-2">
    <h3>Chord from notation</h3>
    <div class="row">
      <div class="col-auto m-auto">
        <input class="form-control" type="text" placeholder="Dm7" v-model="customQuality" />
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <piano-layout
        class="col-auto"
        v-if="chordRoot"
        :chord="chord"
        :scale="[]"
        :chord-root="chordRoot"
      />
    </div>
  </div>
</template>
