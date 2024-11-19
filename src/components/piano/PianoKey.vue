<script setup lang="ts">
import type { SharpNote } from '@/music/types'
import { usePlayer } from '@/music/player'

const player = usePlayer()

const props = defineProps<{
  isBlack: boolean
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: SharpNote
  octave: number
}>()

function play() {
  player.playNote(props.note, props.octave, 500)
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
