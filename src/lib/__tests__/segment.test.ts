import { describe, expect, it } from 'vitest'
import { segmentSentences, segmentWords } from '../segment'

const en = 'Dr. Smith went home. Then he slept! How nice?'
const cjk = '你好世界。再见世界。'
const rtl = 'שלום עולם. מה שלומך?'

describe('segment', () => {
  it('segments words (smart)', () => {
    const words = segmentWords(en, 'en', true)
    expect(words.length).toBeGreaterThan(3)
  })
  it('segments sentences (smart)', () => {
    const s = segmentSentences(en, 'en', true)
    expect(s.length).toBe(3)
  })
  it('segments CJK sentences', () => {
    const s = segmentSentences(cjk, 'zh', true)
    expect(s.length).toBe(2)
  })
  it('segments RTL sentences', () => {
    const s = segmentSentences(rtl, 'he', true)
    expect(s.length).toBe(2)
  })
})
