import { NOTE_LETTERS, type Alteration, type NoteLetter, type Note } from '@/music/types'
import { transposeNoteByInterval } from '@/music/utils'
import {
  type ScaleIntervals,
  SCALE_INTERVALS,
  type NaturalDegree,
  ORDERED_DEGREES,
  ScaleEnum,
} from '@/music/scale/types'
import { type Chord, CHORD_STRUCTURES, ChordStructureEnum, Interval } from '@/music/chord/types'

export function getScaleInterval(
  scaleIntervals: ScaleIntervals,
  fromIndex: number,
  toIndex: number,
): number {
  const scaleLength = scaleIntervals.length
  const sevenFrom = fromIndex % scaleLength
  const sevenTo = toIndex % scaleLength
  const numOctaves = toIndex > fromIndex ? Math.floor((toIndex - fromIndex) / scaleLength) : 0

  let semiToneSum = numOctaves * 12
  for (let i = sevenFrom; i !== sevenTo; i = (i + 1) % scaleLength) {
    semiToneSum += scaleIntervals[i]
  }

  return semiToneSum
}

export function generateChordFromScaleDegree(
  scaleRootNote: Note,
  scale: ScaleEnum,
  degree: NaturalDegree,
  chordStructure: ChordStructureEnum,
): Chord {
  const degreeIndex = ORDERED_DEGREES.indexOf(degree)
  const scaleIntervals = SCALE_INTERVALS[scale]
  const rootSemitones = getScaleInterval(scaleIntervals, 0, degreeIndex)
  const chordRoot = transposeNoteByInterval(scaleRootNote, {
    diatonicSteps: degreeIndex,
    semitones: rootSemitones,
  })

  const chordStructureDefinition = CHORD_STRUCTURES[chordStructure]
  const chord: Chord = []
  for (const orderedNote of chordStructureDefinition) {
    chord.push(
      transposeNoteByInterval(chordRoot, {
        diatonicSteps: orderedNote,
        semitones: getScaleInterval(scaleIntervals, degreeIndex, degreeIndex + orderedNote),
      }),
    )
  }

  return chord
}

type noteQuality = null | '' | 'b' | 'bb' | '#'
type DegreeKey =
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth'
  | 'seventh'
  | 'ninth'
  | 'eleventh'
  | 'thirteenth'
type Degrees = Record<DegreeKey, noteQuality>

type QualityRule = {
  tokens: string[]
  firstCharOnly?: true
  notIfIncludes?: string[]
  notIfStartsWith?: string[]
  sets: Partial<Degrees>
}

// Rules are applied in order — later rules override earlier ones.
// Cascades come first (lower priority), explicit degree setters come after (higher priority).
const QUALITY_RULES: QualityRule[] = [
  // Extension cascades: imply b7 + all lower extensions
  {
    tokens: ['13'],
    notIfIncludes: ['add13'],
    sets: { seventh: 'b', ninth: '', eleventh: '', thirteenth: '' },
  },
  { tokens: ['11'], notIfIncludes: ['add11'], sets: { seventh: 'b', ninth: '', eleventh: '' } },
  { tokens: ['9'], notIfIncludes: ['add9', '6/9', 'b9', '#9'], sets: { seventh: 'b', ninth: '' } },

  // Explicit extensions (override cascades above)
  { tokens: ['b9'], sets: { ninth: 'b' } },
  { tokens: ['#9'], sets: { ninth: '#' } },
  { tokens: ['add9', '6/9'], sets: { ninth: '' } },
  { tokens: ['#11', '+11'], sets: { eleventh: '#' } },
  { tokens: ['add11'], sets: { eleventh: '' } },
  { tokens: ['b13'], sets: { thirteenth: 'b' } },
  { tokens: ['add13'], sets: { thirteenth: '' } },

  // Second
  { tokens: ['2', 'add2'], sets: { second: '' } },

  // Third
  {
    tokens: ['m', '-', '°', 'o', 'ø', 'Ø', 'd'],
    firstCharOnly: true,
    notIfStartsWith: ['maj'],
    sets: { third: 'b' },
  },
  { tokens: ['5'], firstCharOnly: true, sets: { third: null } },
  { tokens: ['no3', 'sus'], sets: { third: null } },

  // Sus2: second + no third (must come after the generic sus rule to override fourth='' for sus)
  { tokens: ['sus2'], sets: { third: null, second: '' } },

  // Fourth
  { tokens: ['4', 'add4'], sets: { fourth: '' } },
  { tokens: ['sus4', 'sus'], notIfIncludes: ['sus2', '13sus'], sets: { fourth: '' } },

  // Fifth: diminished
  { tokens: ['°', 'o', 'ø', 'Ø'], firstCharOnly: true, sets: { fifth: 'b' } },
  { tokens: ['dim', '-5', 'b5', 'o5', '°5'], sets: { fifth: 'b' } },
  // Fifth: augmented
  { tokens: ['+'], firstCharOnly: true, sets: { fifth: '#' } },
  { tokens: ['aug', '+5', '#5', 'm+'], sets: { fifth: '#' } },

  // Sixth
  { tokens: ['6', '6/9'], sets: { sixth: '' } },

  // Seventh (explicit — must come after cascades to allow maj to override b7)
  { tokens: ['7', 'ø', 'Ø'], sets: { seventh: 'b' } },
  { tokens: ['maj', 'Maj', 'M', 'Δ'], sets: { seventh: '' } },
  { tokens: ['dim7', '°7', 'o7'], sets: { seventh: 'bb' } },

  // Notation characters (recognized but no effect on degrees)
  { tokens: ['/', '(', ')'], sets: {} },
]

const QUALITY_TOKENS_SORTED = [...new Set(QUALITY_RULES.flatMap((r) => r.tokens))].sort(
  (a, b) => b.length - a.length,
)

const FIRST_CHAR_TOKENS = new Set(
  QUALITY_RULES.filter((r) => r.firstCharOnly).flatMap((r) => r.tokens),
)

function applyRules(qualityStr: string): Degrees {
  const arr = Array.from(qualityStr)
  const degrees: Degrees = {
    second: null,
    third: '',
    fourth: null,
    fifth: '',
    sixth: null,
    seventh: null,
    ninth: null,
    eleventh: null,
    thirteenth: null,
  }

  for (const rule of QUALITY_RULES) {
    if (rule.notIfIncludes?.some((s) => qualityStr.includes(s))) continue
    if (rule.notIfStartsWith?.some((s) => qualityStr.startsWith(s))) continue

    const matches = rule.firstCharOnly
      ? rule.tokens.some((t) => t === arr[0])
      : rule.tokens.some((t) => qualityStr.includes(t))

    if (matches) Object.assign(degrees, rule.sets)
  }

  return degrees
}

// todo: bass
export function generateChordIntervalsFromCustomQuality(qualityStr: string): Interval[] {
  const d = applyRules(qualityStr)
  const intervals: Interval[] = [Interval.Tonic]

  if (d.second !== null) intervals.push(Interval.Second)
  if (d.third !== null) intervals.push(d.third === 'b' ? Interval.MinorThird : Interval.MajorThird)
  if (d.fourth !== null) intervals.push(Interval.Fourth)
  if (d.fifth === 'b') intervals.push(Interval.DiminishedFifth)
  else if (d.fifth === '#') intervals.push(Interval.AugmentedFifth)
  else intervals.push(Interval.Fifth)
  if (d.sixth !== null) intervals.push(Interval.MajorSixth)
  if (d.seventh === 'bb') intervals.push(Interval.DiminishedSeventh)
  else if (d.seventh === 'b') intervals.push(Interval.MinorSeventh)
  else if (d.seventh === '') intervals.push(Interval.MajorSeventh)
  if (d.ninth !== null) {
    if (d.ninth === 'b') intervals.push(Interval.DiminishedNinth)
    else if (d.ninth === '#') intervals.push(Interval.AugmentedNinth)
    else intervals.push(Interval.Ninth)
  }
  if (d.eleventh !== null)
    intervals.push(d.eleventh === '#' ? Interval.AugmentedEleventh : Interval.Eleventh)
  if (d.thirteenth !== null)
    intervals.push(d.thirteenth === 'b' ? Interval.DiminishedThirteenth : Interval.Thirteenth)

  return intervals
}

function sanitizeCustomQuality(customQuality: string): string {
  const trimmed = customQuality.trim()
  if (trimmed.length === 0) return ''
  return (trimmed[0].toUpperCase() + trimmed.slice(1)).replace(/♭/g, 'b').replace(/♯/g, '#')
}

function parseRootAndQualityStr(sanitized: string): { root: Note; qualityStr: string } | null {
  const arr = Array.from(sanitized)
  const letter = arr[0]
  if (!(NOTE_LETTERS as string[]).includes(letter)) return null

  const root: Note = { letter: letter as NoteLetter, alteration: '' }
  let rest = arr.slice(1)
  if (rest.length > 0 && ['b', '#'].includes(rest[0])) {
    root.alteration = rest[0] as Alteration
    rest = rest.slice(1)
  }

  return { root, qualityStr: rest.join('') }
}

export type InputSegment = { text: string; ignored: boolean }

export type ChordParseResult = {
  chord: Chord
  error: string | null
  inputSegments: InputSegment[]
}

function getIgnoredPositions(qualityStr: string): boolean[] {
  const chars = Array.from(qualityStr)
  const ignored = chars.map(() => true)

  for (const token of QUALITY_TOKENS_SORTED) {
    const tokenChars = Array.from(token)
    if (FIRST_CHAR_TOKENS.has(token)) {
      if (tokenChars.every((c, i) => ignored[i] && chars[i] === c)) {
        tokenChars.forEach((_, i) => (ignored[i] = false))
      }
    } else {
      outer: for (let i = 0; i <= chars.length - tokenChars.length; i++) {
        for (let j = 0; j < tokenChars.length; j++) {
          if (chars[i + j] !== tokenChars[j] || !ignored[i + j]) continue outer
        }
        tokenChars.forEach((_, j) => (ignored[i + j] = false))
        break // only first occurrence — the parser applies each rule once
      }
    }
  }

  return ignored
}

function buildInputSegments(root: Note, qualityStr: string): InputSegment[] {
  const segments: InputSegment[] = [{ text: root.letter + root.alteration, ignored: false }]
  const qualityChars = Array.from(qualityStr)
  const ignoredPositions = getIgnoredPositions(qualityStr)

  for (let i = 0; i < qualityChars.length; i++) {
    const isIgnored = ignoredPositions[i]
    const last = segments[segments.length - 1]
    if (last.ignored === isIgnored) {
      last.text += qualityChars[i]
    } else {
      segments.push({ text: qualityChars[i], ignored: isIgnored })
    }
  }

  return segments
}

export function parseCustomQuality(input: string): ChordParseResult {
  const sanitized = sanitizeCustomQuality(input)
  if (sanitized.length === 0) return { chord: [], error: null, inputSegments: [] }

  const parsed = parseRootAndQualityStr(sanitized)
  if (parsed === null) {
    return {
      chord: [],
      error: `Invalid chord root: "${Array.from(sanitized)[0]}"`,
      inputSegments: [],
    }
  }

  const intervals = generateChordIntervalsFromCustomQuality(parsed.qualityStr)

  return {
    chord: intervals.map((interval) => transposeNoteByInterval(parsed.root, interval)),
    error: null,
    inputSegments: buildInputSegments(parsed.root, parsed.qualityStr),
  }
}

export function getCustomQualityWarnings(input: string): string[] {
  const { inputSegments } = parseCustomQuality(input)
  const ignored = inputSegments
    .filter((s) => s.ignored)
    .map((s) => s.text)
    .join('')
  return ignored ? [`Ignored "${ignored}" in quality`] : []
}

export function generateChordFromCustomQuality(customQuality: string): Chord {
  const result = parseCustomQuality(customQuality)
  if (result.error !== null) throw new Error(result.error)
  return result.chord
}
