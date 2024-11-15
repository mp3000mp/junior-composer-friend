<script setup lang="ts">
import type { Note } from '@/music/types'

defineProps<{
  isBlack: boolean
  isHighlighted: boolean
  isPlayed: boolean
  isTonic: boolean
  note: Note
}>()
</script>

<template>
  <div
    class="key"
    :class="{
      highlighted: isHighlighted,
      played: isPlayed,
      tonic: isTonic,
      black: isBlack,
      white: !isBlack,
    }">
    {{ isPlayed ? note : '' }}
  </div>
</template>
