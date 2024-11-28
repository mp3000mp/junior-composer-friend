<script setup lang="ts">
import { computed, ref } from 'vue'
import { type SharpNote } from '@/music/types'
import { ChordStructure } from '@/music/chord/types'
import { ScaleEnum, type NaturalDegree, SCALE_INTERVALS } from '@/music/scale/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import NoteSelector from '@/components/form/NoteSelector.vue'
import ModeSelector from '@/components/form/ScaleSelector.vue'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { generateChordFromModeDegree } from '@/music/chord/chordGenerator'
import ChordStructureSelector from '@/components/form/ChordStructureSelector.vue'
import DegreeSelector from '@/components/form/DegreeSelector.vue'

const modeRoot = ref<SharpNote>('E')
const mode = ref<ScaleEnum>(ScaleEnum.Mixolydian)
const degree = ref<NaturalDegree>('I')
const chordStructure = ref<ChordStructure>(ChordStructure.Tetrad)

const scale = computed(() => generateScaleFromIntervals(modeRoot.value, SCALE_INTERVALS[mode.value]))
const chord = computed(() =>
  generateChordFromModeDegree(modeRoot.value, mode.value, degree.value, chordStructure.value),
)
</script>

<template>
  <div class="container py-2">
    <h3>Chord from mode degree</h3>
    <div class="row justify-content-center">
      <div class="col-auto">
        <note-selector v-model="modeRoot" />
      </div>
      <div class="col-auto">
        <mode-selector v-model="mode" />
      </div>
      <div class="col-auto">
        <degree-selector v-model="degree" />
      </div>
      <div class="col-auto">
        <chord-structure-selector v-model="chordStructure" />
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <piano-layout class="col-auto" :chord="chord" :scale="scale" :chord-root="chord[0]" />
    </div>
  </div>
</template>
