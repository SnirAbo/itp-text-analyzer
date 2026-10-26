/* eslint-disable no-restricted-globals */
import { analyzeText } from '../analyze'
import type { CountOptions } from '../types'

// Message protocol
// postMessage({ type: 'analyze', id, text, options })
// Worker may post { type: 'progress', id, partial } or { type: 'result', id, result }

let latestId = 0

self.onmessage = (e: MessageEvent) => {
  const msg = e.data as { type: string; id: number; text: string; options: CountOptions }
  if (msg.type !== 'analyze') return
  latestId = Math.max(latestId, msg.id)
  const id = msg.id
  const { text, options } = msg

  const CHUNK = 50_000
  if (text.length < CHUNK) {
    if (id !== latestId) return
    const result = analyzeText(text, options)
    ;(self as any).postMessage({ type: 'result', id, result })
    return
  }

  // Chunked processing with partial updates
  let combined = ''
  for (let i = 0; i < text.length; i += CHUNK) {
    if (id !== latestId) return // cancel stale
    const chunk = text.slice(i, i + CHUNK)
    combined += chunk
    const partial = analyzeText(combined, options)
    ;(self as any).postMessage({ type: 'progress', id, partial: { i: i + CHUNK, result: partial } })
  }
  if (id !== latestId) return
  const final = analyzeText(text, options)
  ;(self as any).postMessage({ type: 'result', id, result: final })
}
