import { SEMITONES_PER_OCTAVE } from '@/music/types'

export const BASE_OCTAVE = 4

// The keyboard shows (and the player loads) three octaves around BASE_OCTAVE
export const KEYBOARD_OCTAVE_MIN = BASE_OCTAVE - 1
export const KEYBOARD_OCTAVE_MAX = BASE_OCTAVE + 1
export const KEYBOARD_MIDI_MIN = (KEYBOARD_OCTAVE_MIN + 1) * SEMITONES_PER_OCTAVE
export const KEYBOARD_MIDI_MAX = (KEYBOARD_OCTAVE_MAX + 2) * SEMITONES_PER_OCTAVE - 1
