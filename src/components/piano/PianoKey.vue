<script setup lang="ts">
import type { Note } from '@/music/types'

defineProps<{
  isBlack: boolean
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: Note
}>()
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
  >
    {{ isPlayed ? note : '' }}
  </div>
</template>
