<script setup lang="ts">
import type { Note } from '@/music/types'
import { usePlayer } from '@/music/player'
import { noteToString } from '../../music/utils'

const player = usePlayer()

export type PianoKeyProps = {
  isBlack: boolean
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: Note
  octave: number
}

const props = defineProps<PianoKeyProps>()

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
    {{ isPlayed ? noteToString(note) : '' }}
  </div>
</template>
