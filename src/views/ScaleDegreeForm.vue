<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Note } from '@/music/types'
import { ChordStructure } from '@/music/chord/types'
import { ScaleEnum, type NaturalDegree, SCALE_INTERVALS } from '@/music/scale/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import NoteSelector from '@/components/form/NoteSelector.vue'
import ScaleSelector from '@/components/form/ScaleSelector.vue'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { generateChordFromScaleDegree } from '@/music/chord/chordGenerator'
import { getEligibleChordQualities } from '@/music/chord/chordAnalyzer'
import { noteToString } from '@/music/utils'
import ChordStructureSelector from '@/components/form/ChordStructureSelector.vue'
import DegreeSelector from '@/components/form/DegreeSelector.vue'

const scaleRoot = ref<Note>({ letter: 'E', alteration: '' })
const scale = ref<ScaleEnum>(ScaleEnum.Mixolydian)
const degree = ref<NaturalDegree>('I')
const chordStructure = ref<ChordStructure>(ChordStructure.Tetrad)

const scaleNotes = computed(() =>
  generateScaleFromIntervals(scaleRoot.value, SCALE_INTERVALS[scale.value]),
)
const chord = computed(() =>
  generateChordFromScaleDegree(scaleRoot.value, scale.value, degree.value, chordStructure.value),
)
const chordName = computed(() => {
  if (chord.value.length === 0) return null
  const root = noteToString(chord.value[0])
  const qualities = getEligibleChordQualities(chord.value)
  return qualities.length > 0 ? root + qualities[0] : root
})
</script>

<template>
  <div class="container py-2">
    <div class="row justify-content-center g-3">
      <div class="col-12 col-sm-6 col-xl-auto d-flex flex-column align-items-center">
        <div class="text-secondary mb-2">Root</div>
        <div class="flex-grow-1 d-flex align-items-center">
          <note-selector v-model="scaleRoot" />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-auto d-flex flex-column align-items-center">
        <div class="text-secondary mb-2 d-flex align-items-center gap-1">
          Scale
          <a
            href="https://en.wikipedia.org/wiki/Mode_(music)"
            target="_blank"
            rel="noopener"
            class="text-secondary"
            title="Musical modes"
          >
            <font-aw icon="circle-question" size="sm" />
          </a>
        </div>
        <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-1">
          <scale-selector v-model="scale" />
          <div class="text-secondary font-monospace">
            {{ scaleNotes.map(noteToString).join(' ') }}
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-auto d-flex flex-column align-items-center">
        <div class="text-secondary mb-2">Degree</div>
        <div class="flex-grow-1 d-flex align-items-center">
          <degree-selector v-model="degree" />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-auto d-flex flex-column align-items-center">
        <div class="text-secondary mb-2">Chord type</div>
        <div class="flex-grow-1 d-flex align-items-center">
          <chord-structure-selector v-model="chordStructure" />
        </div>
      </div>
    </div>
    <div v-if="chordName" class="row mt-3 justify-content-center">
      <div class="col-auto text-center">
        <span class="fs-4 fw-bold">{{ chordName }}</span>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <piano-layout :chord="chord" :scale="scaleNotes" />
      </div>
    </div>
  </div>
</template>
