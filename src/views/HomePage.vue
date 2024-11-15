<script setup lang="ts">
import PianoLayout from '@/components/PianoLayout.vue'
import { generateScaleFromMode } from '@/music/scaleGenerator'
import { ChordStructure, Mode } from '@/music/types'
import { generateChordFromModeDegree } from '@/music/chordGenerator'

const tonic1 = 'C'
const mode1 = Mode.Aeolian
const scale1 = generateScaleFromMode(tonic1, mode1)
const chord1 = generateChordFromModeDegree(tonic1, mode1, 'I', ChordStructure.Triad)
const tonic2 = 'D'
const mode2 = Mode.Ionian
const scale2 = generateScaleFromMode('D', mode2)
const chord2 = generateChordFromModeDegree(tonic2, mode2, 'II', ChordStructure.Tetrad)
</script>

<template>
  <main>
    <piano-layout :chord="chord1" :scale="scale1" :tonic="tonic1" />
    <piano-layout :chord="chord2" :scale="scale2" :tonic="tonic2" />
  </main>
</template>
