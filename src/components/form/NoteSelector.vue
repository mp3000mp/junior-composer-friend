<script setup lang="ts">
import { noteFromString, noteToString } from '@/music/utils'
import { type Note, NOTE_LETTERS } from '@/music/types'
import { computed, ref, watch } from 'vue'

const model = defineModel<Note | null>({ required: true })

const stringValue = computed({
  get: () => (model.value ? noteToString(model.value) : null),
  set: (value) => {
    model.value = value ? noteFromString(value) : null
  },
})

const alterationMode = ref<'#' | 'b'>('#')

const notes = computed<Note[]>(() => {
  if (alterationMode.value === '#') {
    return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  }
  return ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
})

watch(alterationMode, () => {
  const currentNote = noteFromString(stringValue.value)
  if (currentNote.alteration === '') {
    return
  }
  if (currentNote.alteration !== alterationMode.value) {
    const letterIndex =
      (NOTE_LETTERS.indexOf(currentNote.letter) + (alterationMode.value === '#' ? -1 : 1)) %
      NOTE_LETTERS.length
    const newLetter = NOTE_LETTERS[letterIndex]
    const newAlteration = alterationMode.value
    stringValue.value = newLetter + newAlteration
  }
})
</script>

<template>
  <div class="d-flex flex-column">
    <div class="btn-group btn-group-sm mb-2" role="group" aria-label="Alteration mode">
      <input
        type="radio"
        class="btn-check"
        name="alterationMode"
        id="sharpMode"
        autocomplete="off"
        v-model="alterationMode"
        value="#"
      />
      <label class="btn btn-outline-primary" for="sharpMode">#</label>

      <input
        type="radio"
        class="btn-check"
        name="alterationMode"
        id="flatMode"
        autocomplete="off"
        v-model="alterationMode"
        value="b"
      />
      <label class="btn btn-outline-primary" for="flatMode">b</label>
    </div>
    <select class="form-select" v-model="stringValue">
      <option v-for="note in notes" :key="note" :value="note">{{ note }}</option>
    </select>
  </div>
</template>
