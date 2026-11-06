import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'
import Component, { type PianoLayoutProp } from '@/components/piano/PianoLayout.vue'
import PianoKey from '@/components/piano/PianoKey.vue'
import { mount } from '@vue/test-utils'
import { makeNote } from '../../../test-utils'
import { chordToMidi, noteToString } from '@/music/utils'
import { createPlayerMock, type PlayerMock } from '@/test-utils/player'

const stubs = ['font-aw']

let playerMock: PlayerMock
vi.mock('@/music/player', () => ({
  usePlayer: () => playerMock,
  pianoLoadProgress: ref({ loaded: 1, total: 1 }),
  isPianoLoaded: ref(true),
  pianoLoadPercent: ref(100),
}))

describe('PianoLayout.vue', () => {
  let defaultProps: PianoLayoutProp
  beforeEach(() => {
    playerMock = createPlayerMock({
      playChord: vi.fn(),
      playMidi: vi.fn(),
      preload: vi.fn(),
    })
    defaultProps = {
      scale: [
        makeNote('C'),
        makeNote('D'),
        makeNote('E'),
        makeNote('F'),
        makeNote('G'),
        makeNote('A'),
        makeNote('B'),
      ],
      chord: [makeNote('D'), makeNote('F'), makeNote('A')],
    }
  })

  test('should show three octaves', () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
      global: {
        stubs,
      },
    })
    const pianoKeys = wrapper.findAllComponents(PianoKey)
    expect(pianoKeys.length).toBe(36)
  })

  test('should trigger events', async () => {
    const wrapper = mount(Component, {
      props: { ...defaultProps },
      global: {
        stubs,
      },
    })
    const icons = wrapper.findAll('font-aw-stub')
    expect(icons.length).toBe(3)
    await icons[0].trigger('click')
    expect(playerMock.playChord).toHaveBeenCalledTimes(1)
    await icons[1].trigger('click')
    expect(playerMock.playChord).toHaveBeenCalledTimes(2)
  })

  const enharmonicChordTestCases: { label: string; chord: PianoLayoutProp['chord'] }[] = [
    { label: 'G# B# D#', chord: [makeNote('G', '#'), makeNote('B', '#'), makeNote('D', '#')] },
    { label: 'Ab Cb Eb', chord: [makeNote('A', 'b'), makeNote('C', 'b'), makeNote('E', 'b')] },
    { label: 'Db Fb Abb', chord: [makeNote('D', 'b'), makeNote('F', 'b'), makeNote('A', 'bb')] },
    { label: 'A# C## E#', chord: [makeNote('A', '#'), makeNote('C', '##'), makeNote('E', '#')] },
  ]
  enharmonicChordTestCases.forEach(({ label, chord }) => {
    test(`should show every note of chord ${label}`, () => {
      const wrapper = mount(Component, {
        props: { scale: [], chord },
        global: { stubs },
      })
      const played = wrapper.findAllComponents(PianoKey).filter((k) => k.props('isPlayed'))
      expect(played.map((k) => k.text())).toEqual(label.split(' '))
    })
  })

  test('should highlight enharmonic scale notes (Cb, B#)', () => {
    const wrapper = mount(Component, {
      props: { scale: [makeNote('C', 'b'), makeNote('B', '#')], chord: [] },
      global: { stubs },
    })
    const highlighted = wrapper
      .findAllComponents(PianoKey)
      .filter((k) => k.props('isHighlighted'))
      .map((k) => noteToString(k.props('note')))
    // 3 octaves x 2 notes (B and C keys)
    expect(highlighted.sort()).toEqual(['B', 'B', 'B', 'C', 'C', 'C'])
  })

  test('should show the chord at the pitches the player plays', () => {
    const chord = [makeNote('B'), makeNote('D', '#'), makeNote('F', '#'), makeNote('A')]
    const wrapper = mount(Component, {
      props: { scale: [], chord },
      global: { stubs },
    })
    const playedMidis = wrapper
      .findAllComponents(PianoKey)
      .filter((k) => k.props('isPlayed'))
      .map((k) => k.props('midi'))
    expect(playedMidis).toEqual(chordToMidi(chord))
  })
})
