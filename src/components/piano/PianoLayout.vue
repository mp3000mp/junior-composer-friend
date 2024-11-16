<script setup lang="ts">
import PianoKey from '@/components/piano/PianoKey.vue'
import { type Chord, CHROMATIC_SCALE, type Note, type Scale } from '@/music/types'
import { computed } from 'vue'

const props = defineProps<{
  chordRoot: Note
  scale: Scale
  chord: Chord
}>()

type KeyNote = {
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: Note
  octave: number
}

const twoOctavesNotes = computed(() => {
  const notes: KeyNote[] = []
  let chordCursor = 0
  for (let i = 0; i < 2; i++) {
    for (const note of CHROMATIC_SCALE) {
      let isPlayed = false
      if (chordCursor < props.chord.length && props.chord[chordCursor] === note) {
        isPlayed = true
        chordCursor++
      }
      notes.push({
        isHighlighted: props.scale.includes(note),
        isPlayed,
        isChordRoot: note === props.chordRoot,
        isScaleRoot: note === props.scale[0],
        note,
        octave: i,
      })
    }
  }
  return notes
})
</script>

<template>
  <div class="piano-layout">
    <piano-key
      v-for="keyNote in twoOctavesNotes"
      :key="keyNote.note + keyNote.octave"
      :is-highlighted="keyNote.isHighlighted"
      :is-played="keyNote.isPlayed"
      :is-chord-root="keyNote.isChordRoot"
      :is-scale-root="keyNote.isScaleRoot"
      :is-black="keyNote.note.includes('#')"
      :note="keyNote.note"
    />
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@import 'src/assets/style/bootstrap/vars-override';

$whiteKeyWidth: 35px;
$blackKeyWidth: $whiteKeyWidth * 0.75;
$highlightedColor: color.adjust($white, $lightness: -15%, $space: hsl);

.piano-layout {
  display: flex;

  .key {
    width: $whiteKeyWidth;
    height: $whiteKeyWidth * 3;
    border: 1px solid #333;
    position: relative;
    margin: 0 1px;
    padding-bottom: 5px;
    display: flex;
    align-items: end;
    justify-content: center;
    font-weight: bold;

    &.black {
      background-color: $black;
      color: $white;
      height: $whiteKeyWidth * 2;
      width: $blackKeyWidth;
      margin: 0 $blackKeyWidth/-2;
      z-index: 1;
      &.highlighted {
        background-color: color.adjust($highlightedColor, $lightness: -50%, $space: hsl);
      }
      &.scale-root {
        background-color: color.adjust($red, $lightness: -15%, $space: hsl) !important;
      }
      &.played {
        color: $white;
      }
    }

    &.white {
      background-color: $white;
      color: $black;
      &.highlighted {
        background-color: $highlightedColor;
      }
      &.scale-root {
        background-color: color.adjust($red, $lightness: 60%, $space: hsl) !important;
      }
    }

    &.chord-root {
      color: color.adjust($red, $lightness: 20%, $space: hsl) !important;
    }
  }
}
</style>
