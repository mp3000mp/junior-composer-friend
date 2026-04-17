<script setup lang="ts">
import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import { type Note } from '@/music/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import { parseCustomQuality } from '@/music/chord/chordGenerator'

const customQuality = ref('')
const customQualityDebounced = refDebounced(customQuality, 300)

const chordResult = computed(() => parseCustomQuality(customQualityDebounced.value))

const chord = computed(() => chordResult.value.chord)
const chordError = computed(() => chordResult.value.error)
const chordRoot = computed<Note | null>(() => (chord.value.length === 0 ? null : chord.value[0]))
</script>

<template>
  <div class="container py-2">
    <h3>Chord from notation</h3>
    <div class="row">
      <div class="col-auto m-auto">
        <input class="form-control" type="text" placeholder="Dm7" v-model="customQuality" />
      </div>
      <div v-if="chordError" class="col-auto m-auto mt-2 text-danger small">{{ chordError }}</div>
      <div
        v-if="chordResult.inputSegments.some((s) => s.ignored)"
        class="col-auto m-auto mt-2 font-monospace"
      >
        <span
          v-for="(seg, i) in chordResult.inputSegments"
          :key="i"
          :class="{ 'text-warning': seg.ignored, ignored: seg.ignored }"
          :title="seg.ignored ? 'Non reconnu' : undefined"
          >{{ seg.text }}</span
        >
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <piano-layout class="col-auto" v-if="chordRoot" :chord="chord" :scale="[]" />
    </div>
  </div>
</template>

<style scoped>
.ignored {
  cursor: help;
  text-decoration: underline dotted;
}
</style>
