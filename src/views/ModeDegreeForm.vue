<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChordStructure, Mode, type Degree, type Note } from '@/music/types'
import PianoLayout from '@/components/piano/PianoLayout.vue'
import NoteSelector from '@/components/form/NoteSelector.vue'
import ModeSelector from '@/components/form/ModeSelector.vue'
import { generateScaleFromMode } from '@/music/scaleGenerator'
import { generateChordFromModeDegree } from '@/music/chordGenerator'
import ChordStructureSelector from '@/components/form/ChordStructureSelector.vue'
import DegreeSelector from '@/components/form/DegreeSelector.vue'

const modeRoot = ref<Note>('E')
const mode = ref<Mode>(Mode.Mixolydian)
const degree = ref<Degree>('I')
const chordStructure = ref<ChordStructure>(ChordStructure.Tetrad)

const scale = computed(() => generateScaleFromMode(modeRoot.value, mode.value))
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
