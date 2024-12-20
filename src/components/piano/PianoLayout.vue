<script setup lang="ts">
import PianoKey from '@/components/piano/PianoKey.vue'
import { BASE_OCTAVE, SHARP_CHROMATIC_SCALE, type SharpNote } from '@/music/types'
import { type Chord } from '@/music/chord/types'
import { type Scale } from '@/music/scale/types'
import { computed, onMounted, onUnmounted, type Ref, ref, watch } from 'vue'
import { usePlayer } from '@/music/player'
import { getSharpNote } from '@/music/utils'
import { onClickOutside } from '@vueuse/core'

const player = usePlayer()

const props = defineProps<{
  chordRoot: SharpNote
  scale: Scale
  chord: Chord
}>()

type KeyNote = {
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  note: SharpNote
  octave: number
}

const sharpScale = computed(() => props.scale.map((note) => getSharpNote(note)))

const pianoNotes = computed(() => {
  const notes: KeyNote[] = []
  let chordCursor = 0
  for (let i = BASE_OCTAVE - 1; i < BASE_OCTAVE + 2; i++) {
    for (const note of SHARP_CHROMATIC_SCALE) {
      let isPlayed = false
      if (chordCursor < props.chord.length && props.chord[chordCursor] === note) {
        isPlayed = true
        chordCursor++
      }
      notes.push({
        isHighlighted: sharpScale.value.includes(note),
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

function playPlatedChord() {
  player.playChord(props.chord)
}
function playArpeggiatedChord() {
  player.playChord(props.chord, 400)
}

const volumeRange = 500
const volumeSliderShown = ref(false)
const volume = ref(volumeRange / 10)
function showVolumeSlider() {
  volumeSliderShown.value = true
}
function hideVolumeSlider() {
  volumeSliderShown.value = false
}
watch(volume, () => {
  player.setVolume(volume.value / volumeRange)
})

function handleKeypress(e: KeyboardEvent) {
  if (e.code === 'Escape') {
    hideVolumeSlider()
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeypress)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeypress)
})

const volumeSlider: Ref<HTMLInputElement> = ref(null)
onClickOutside(volumeSlider, () => hideVolumeSlider())
</script>

<template>
  <div class="piano-layout">
    <div class="piano-keyboard">
      <piano-key
        v-for="keyNote in pianoNotes"
        :key="keyNote.note + keyNote.octave"
        :is-highlighted="keyNote.isHighlighted"
        :is-played="keyNote.isPlayed"
        :is-chord-root="keyNote.isChordRoot"
        :is-scale-root="keyNote.isScaleRoot"
        :is-black="keyNote.note.includes('#')"
        :note="keyNote.note"
        :octave="keyNote.octave"
      />
    </div>
    <div class="text-center">
      <font-aw class="cp" icon="play" @click="playPlatedChord" title="plated" />
      <font-aw class="cp ms-1" icon="music" @click="playArpeggiatedChord" title="arpeggiated" />
      <font-aw class="cp ms-1" icon="volume-low" @click="showVolumeSlider" title="volume" />
    </div>
    <div id="volume-tooltip" v-if="volumeSliderShown" class="text-center">
      <input type="range" min="0" max="100" v-model="volume" ref="volumeSlider" />
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@import 'src/assets/style/bootstrap/vars-override';

$whiteKeyWidth: 35px;
$blackKeyWidth: $whiteKeyWidth * 0.66;
$highlightedColor: color.adjust($white, $lightness: -5%, $space: hsl);

.piano-keyboard {
  display: flex;

  .key {
    width: $whiteKeyWidth;
    height: $whiteKeyWidth * 3.5;
    border: 1px solid #333;
    position: relative;
    margin: 0 1px;
    padding-bottom: 3px;
    display: flex;
    align-items: end;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    &.black {
      background-color: black;
      color: $white;
      height: $blackKeyWidth * 3.5;
      width: $blackKeyWidth;
      margin: 0 $blackKeyWidth/-2;
      z-index: 1;

      &.played {
        color: $white;
        &.highlighted,
        &:hover {
          color: $black;
        }
      }
    }

    &.white {
      background-color: white;
      color: $black;
    }

    &.highlighted {
      background-color: $highlightedColor;
    }
    &.scale-root {
      background-color: color.adjust($red, $lightness: 60%, $space: hsl);
    }
    &:hover {
      background-color: $highlightedColor;
    }

    &.chord-root {
      color: color.adjust($red, $lightness: 20%, $space: hsl) !important;
    }
  }

  #volume-tooltip {
    position: absolute;
  }
}
</style>
