<script setup lang="ts">
import type { Note } from '@/music/types'
import { computeFrequency } from '@/music/utils'

const props = defineProps<{
  isBlack: boolean
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: Note
  octave: number
}>()

function play() {
  const context = new AudioContext();

  const volume = context.createGain();
  volume.connect(context.destination);
  volume.gain.value = 0.2; // todo slider volume

  const oscillator = context.createOscillator();
  oscillator.type = "sawtooth";
  oscillator.frequency.value = computeFrequency(props.note, props.octave)

  oscillator.connect(volume);
  oscillator.start();
  oscillator.stop(context.currentTime + 1);
}
</script>

<template>
  <div
    class="key"
    :class="{
      highlighted: isHighlighted,
      played: isPlayed,
      'chord-root': isChordRoot,
      'scale-root': isScaleRoot,
      black: isBlack,
      white: !isBlack,
    }"
    @click="play"
  >
    {{ isPlayed ? note : '' }}
  </div>
</template>
