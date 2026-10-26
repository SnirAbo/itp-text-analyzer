import { countGraphemes, countParagraphs } from './counters'
import { segmentSentences, segmentWords } from './segment'
import type { AnalysisResult, CountOptions, Counts } from './types'
import { defaultOptions } from './types'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

// Simple memoization with a tiny LRU
const MAX_CACHE = 8
const cache = new Map<string, AnalysisResult>()

function cacheKey(text: string, options: CountOptions): string {
  const o = options
  // cheap hash: length + first/last 32 chars + opts
  return [text.length, text.slice(0, 32), text.slice(-32), o.locale, +o.smartWordSegmentation, +o.smartSentenceSegmentation, +o.countSpaces].join('|')
}

export function analyzeText(text: string, options: CountOptions = defaultOptions): AnalysisResult {
  const key = cacheKey(text, options)
  const hit = cache.get(key)
  if (hit) return hit

  const words = segmentWords(text, options.locale, options.smartWordSegmentation)
  const sentences = segmentSentences(text, options.locale, options.smartSentenceSegmentation)
  const paragraphs = countParagraphs(text)
  const charsWithSpaces = countGraphemes(text, true)
  const charsNoSpaces = countGraphemes(text, false)

  const counts: Counts = {
    words: words.length,
    sentences: sentences.length,
    paragraphs,
    charsWithSpaces,
    charsNoSpaces,
  }

  const wpm = 200
  const minutes = Math.max(1, Math.round(counts.words / wpm))
  const readingTime = `${minutes} min`

  const result: AnalysisResult = { textLength: text.length, counts, readingTime }
  cache.set(key, result)
  if (cache.size > MAX_CACHE) {
    const first = cache.keys().next().value
    cache.delete(first)
  }
  return result
}

export function makeShareHash(text: string, options: CountOptions): string {
  const payload = JSON.stringify({ t: text, o: options })
  return '#' + compressToEncodedURIComponent(payload)
}

export function parseShareHash(hash: string): { text: string; options: CountOptions } | null {
  if (!hash || hash.length < 2) return null
  try {
    const json = decompressFromEncodedURIComponent(hash.slice(1))
    if (!json) return null
    const { t, o } = JSON.parse(json)
    return { text: String(t || ''), options: { ...defaultOptions, ...(o || {}) } }
  } catch {
    return null
  }
}
