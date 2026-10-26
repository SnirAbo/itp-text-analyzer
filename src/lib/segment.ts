const wordRegex = /[^\p{L}\p{N}']+/u
const sentenceRegex = /(?<=[.!?\u061F\u3002])\s+/u

export function segmentWords(text: string, locale: string, smart: boolean): string[] {
  if (!text.trim()) return []
  if (smart && 'Segmenter' in Intl) {
    try {
      // @ts-expect-error older TS lib may not have type
      const seg = new Intl.Segmenter(locale || undefined, { granularity: 'word' })
      return Array.from(seg.segment(text))
        .filter((s: any) => s.isWordLike)
        .map((s: any) => s.segment)
    } catch {}
  }
  return text
    .split(wordRegex)
    .map((w) => w.trim())
    .filter(Boolean)
}

export function segmentSentences(text: string, locale: string, smart: boolean): string[] {
  if (!text.trim()) return []
  if (smart && 'Segmenter' in Intl) {
    try {
      // @ts-expect-error older TS lib may not have type
      const seg = new Intl.Segmenter(locale || undefined, { granularity: 'sentence' })
      return Array.from(seg.segment(text)).map((s: any) => s.segment.trim()).filter(Boolean)
    } catch {}
  }
  return text.split(sentenceRegex).map((s) => s.trim()).filter(Boolean)
}
