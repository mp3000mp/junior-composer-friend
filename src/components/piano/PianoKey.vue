<script setup lang="ts">
import type { Note } from '@/music/types'
import { usePlayer } from '@/music/player'

const player = usePlayer()

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
  player.play(props.note, props.octave, 500)
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
