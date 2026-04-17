<script setup lang="ts">
import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import { parseCustomQuality } from '@/music/chord/chordGenerator'

const customQuality = ref('Dm7')
const customQualityDebounced = refDebounced(customQuality, 300)

const chordResult = computed(() => parseCustomQuality(customQualityDebounced.value))

const chord = computed(() => chordResult.value.chord)
const chordError = computed(() => chordResult.value.error)
</script>

<template>
  <div class="container py-2">
    <div class="row">
      <div class="col-12 col-sm-auto mx-auto">
        <div
          class="text-secondary mb-2 text-center d-flex align-items-center justify-content-center gap-1"
        >
          Chord notation
          <a
            href="https://en.wikipedia.org/wiki/Nashville_Number_System"
            target="_blank"
            rel="noopener"
            class="text-secondary"
            title="Nashville Number System"
          >
            <font-aw icon="circle-question" size="sm" />
          </a>
        </div>
        <input class="form-control" type="text" placeholder="Dm7" v-model="customQuality" />
        <div class="mt-1 small text-center" style="min-height: 1.5em">
          <span v-if="chordError" class="text-danger">{{ chordError }}</span>
          <span v-else-if="chordResult.inputSegments.some((s) => s.ignored)" class="font-monospace">
            <span
              v-for="(seg, i) in chordResult.inputSegments"
              :key="i"
              :class="{ 'text-warning': seg.ignored, ignored: seg.ignored }"
              :title="seg.ignored ? 'Unrecognized' : undefined"
              >{{ seg.text }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <piano-layout :chord="chord" :scale="[]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ignored {
  cursor: help;
  text-decoration: line-through;
}
</style>
