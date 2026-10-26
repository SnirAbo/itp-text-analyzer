import { describe, expect, it } from 'vitest'
import { countGraphemes } from '../counters'

describe('grapheme counting', () => {
  it('counts emojis as one', () => {
    expect(countGraphemes('👍', true)).toBe(1)
    expect(countGraphemes('👨‍👩‍👧‍👦', true)).toBe(1)
  })
  it('handles spaces toggle', () => {
    expect(countGraphemes('a b', true)).toBe(3)
    expect(countGraphemes('a b', false)).toBe(2)
  })
})
