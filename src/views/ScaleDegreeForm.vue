<script setup lang="ts">
import { computed, ref } from 'vue'
import { type SharpNote } from '@/music/types'
import { ChordStructure } from '@/music/chord/types'
import { ScaleEnum, type NaturalDegree, SCALE_INTERVALS } from '@/music/scale/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import NoteSelector from '@/components/form/NoteSelector.vue'
import ScaleSelector from '@/components/form/ScaleSelector.vue'
import { generateScaleFromIntervals } from '@/music/scale/scaleGenerator'
import { generateChordFromScaleDegree } from '@/music/chord/chordGenerator'
import ChordStructureSelector from '@/components/form/ChordStructureSelector.vue'
import DegreeSelector from '@/components/form/DegreeSelector.vue'

const scaleRoot = ref<SharpNote>('E')
const scale = ref<ScaleEnum>(ScaleEnum.Mixolydian)
const degree = ref<NaturalDegree>('I')
const chordStructure = ref<ChordStructure>(ChordStructure.Tetrad)

const scaleNotes = computed(() =>
  generateScaleFromIntervals(scaleRoot.value, SCALE_INTERVALS[scale.value]),
)
const chord = computed(() =>
  generateChordFromScaleDegree(scaleRoot.value, scale.value, degree.value, chordStructure.value),
)
</script>

<template>
  <div class="container py-2">
    <h3>Chord from scale degree</h3>
    <div class="row justify-content-center">
      <div class="col-auto">
        <note-selector v-model="scaleRoot" />
      </div>
      <div class="col-auto">
        <scale-selector v-model="scale" />
      </div>
      <div class="col-auto">
        <degree-selector v-model="degree" />
      </div>
      <div class="col-auto">
        <chord-structure-selector v-model="chordStructure" />
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <piano-layout class="col-auto" :chord="chord" :scale="scaleNotes" :chord-root="chord[0]" />
    </div>
  </div>
</template>
