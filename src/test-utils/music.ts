import type { Alteration, Note, NoteLetter } from '@/music/types'

export function makeNote(letter: NoteLetter, alteration: Alteration = ''): Note {
  return {
    letter,
    alteration,
  }
}
