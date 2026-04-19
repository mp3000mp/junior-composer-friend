<script setup lang="ts">
import PianoKey from '@/components/piano/PianoKey.vue'
import { type Note, SEMITONES_PER_OCTAVE } from '@/music/types'
import { BASE_OCTAVE } from '@/music/player/types'
import { type Chord } from '@/music/chord/types'
import { type Scale } from '@/music/scale/types'
import { computed, onMounted, onUnmounted, type Ref, ref, watch } from 'vue'

const isLoaded = computed(
  () =>
    pianoLoadProgress.value !== null &&
    pianoLoadProgress.value.loaded >= pianoLoadProgress.value.total,
)
const loadPercent = computed(() => {
  if (!pianoLoadProgress.value || pianoLoadProgress.value.total === 0) return 0
  return Math.round((pianoLoadProgress.value.loaded / pianoLoadProgress.value.total) * 100)
})
import { pianoLoadProgress, usePlayer } from '@/music/player'
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
        isScaleRoot: props.scale.length > 0 && noteAreEquals(chromaticNote, props.scale[0]),
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

const volumeRange = 100
const volumeSliderShown = ref(false)
const volume = ref(Math.round(player.volume * volumeRange))
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
  player.initEager()
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
    <div class="piano-keyboard-scroll">
      <div class="piano-keyboard" :class="{ loading: !isLoaded }">
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
    </div>
    <div class="piano-controls mt-2">
      <template v-if="!isLoaded">
        <div class="piano-load-progress">
          <div class="progress" style="height: 6px">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              :style="{ width: loadPercent + '%' }"
            />
          </div>
          <div class="text-center text-muted" style="font-size: 0.7rem">
            Loading piano{{ pianoLoadProgress ? ` ${loadPercent}%` : '...' }}
          </div>
        </div>
      </template>
      <template v-else>
        <button class="btn btn-sm btn-outline-secondary" @click="playPlatedChord" title="Chord">
          <font-aw icon="play" />
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          @click="playArpeggiatedChord"
          title="Arpeggio"
        >
          <font-aw icon="music" />
        </button>
        <span ref="volumeContainer" style="display: inline-block; position: relative">
          <button class="btn btn-sm btn-outline-secondary" @click="toggleVolumeSlider">
            <font-aw icon="volume-low" />
          </button>
          <div id="volume-tooltip" v-if="volumeSliderShown" class="text-center">
            <input type="range" min="0" max="100" v-model="volume" />
          </div>
        </span>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@import '../../assets/style/bootstrap/vars-override';

$highlightedColor: color.adjust($white, $lightness: -5%, $space: hsl);

.piano-layout {
  width: 100%;
}

.piano-keyboard-scroll {
  overflow-x: auto;
}

.piano-keyboard {
  --key-w: clamp(20px, 4.5vw, 35px);
  display: flex;
  width: fit-content;
  margin: 0 auto;

  .key {
    width: var(--key-w);
    height: calc(var(--key-w) * 3.5);
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
      width: calc(var(--key-w) * 0.66);
      height: calc(var(--key-w) * 2.31);
      margin: 0 calc(var(--key-w) * -0.33);
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

  &.loading .key {
    cursor: default;
    pointer-events: none;
  }
}

.piano-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 31px;
}

.piano-load-progress {
  width: 200px;
}

#volume-tooltip {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
