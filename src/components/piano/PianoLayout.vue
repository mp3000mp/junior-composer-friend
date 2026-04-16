<script setup lang="ts">
import PianoKey from '@/components/piano/PianoKey.vue'
import { type Note, SEMITONES_PER_OCTAVE } from '@/music/types'
import { BASE_OCTAVE } from '@/music/player/types'
import { type Chord } from '@/music/chord/types'
import { type Scale } from '@/music/scale/types'
import { computed, onMounted, onUnmounted, type Ref, ref, watch } from 'vue'
import { usePlayer } from '@/music/player'
import { getIntervalFromC, indexToNote, noteAreEquals, noteToString } from '@/music/utils'
import { onClickOutside } from '@vueuse/core'

const player = usePlayer()

export type PianoLayoutProp = {
  scale: Scale
  chord: Chord
}

const props = defineProps<PianoLayoutProp>()

type KeyNote = {
  isHighlighted: boolean
  isPlayed: boolean
  isChordRoot: boolean
  isScaleRoot: boolean
  isBlack: boolean
  note: Note
  octave: number
}

const scaleIntervalsFromC = computed(() => props.scale.map((note) => getIntervalFromC(note)))

const pianoNotes = computed(() => {
  const keyNotes: KeyNote[] = []
  let chordCursor = 0
  for (let i = BASE_OCTAVE - 1; i < BASE_OCTAVE + 2; i++) {
    for (let semitone = 0; semitone < SEMITONES_PER_OCTAVE; semitone++) {
      const chromaticNote = indexToNote(semitone)
      const intervalFromC = getIntervalFromC(chromaticNote)
      let isPlayed = false
      let note = chromaticNote
      if (
        chordCursor < props.chord.length &&
        noteAreEquals(props.chord[chordCursor], chromaticNote)
      ) {
        isPlayed = true
        note = props.chord[chordCursor]
        chordCursor++
      }
      keyNotes.push({
        isHighlighted: scaleIntervalsFromC.value.includes(intervalFromC),
        isPlayed,
        isChordRoot: props.chord.length > 0 && noteAreEquals(chromaticNote, props.chord[0]),
        isScaleRoot: noteAreEquals(chromaticNote, props.scale[0]),
        isBlack: chromaticNote.alteration === '#',
        note,
        octave: i,
      })
    }
  }
  return keyNotes
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
function toggleVolumeSlider() {
  volumeSliderShown.value = !volumeSliderShown.value
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

const volumeContainer: Ref<HTMLElement | null> = ref(null)
onClickOutside(volumeContainer, () => hideVolumeSlider())
</script>

<template>
  <div class="piano-layout">
    <div class="piano-keyboard">
      <piano-key
        v-for="keyNote in pianoNotes"
        :key="noteToString(keyNote.note) + keyNote.octave"
        :is-highlighted="keyNote.isHighlighted"
        :is-played="keyNote.isPlayed"
        :is-chord-root="keyNote.isChordRoot"
        :is-scale-root="keyNote.isScaleRoot"
        :is-black="keyNote.isBlack"
        :note="keyNote.note"
        :octave="keyNote.octave"
      />
    </div>
    <div class="text-center">
      <font-aw class="cp" icon="play" @click="playPlatedChord" title="plated" />
      <font-aw class="cp ms-1" icon="music" @click="playArpeggiatedChord" title="arpeggiated" />
      <span ref="volumeContainer" style="display: inline-block; position: relative">
        <font-aw class="cp ms-1" icon="volume-low" @click="toggleVolumeSlider" title="volume" />
        <div id="volume-tooltip" v-if="volumeSliderShown" class="text-center">
          <input type="range" min="0" max="100" v-model="volume" />
        </div>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@import '../../assets/style/bootstrap/vars-override';

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
}

#volume-tooltip {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
