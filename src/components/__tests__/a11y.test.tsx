import { afterEach, expect, test } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Metrics } from '../../components/Metrics'

expect.extend(toHaveNoViolations)

afterEach(cleanup)

test('metrics has no a11y violations', async () => {
  const { container } = render(
    <Metrics analysis={{ textLength: 0, readingTime: '1 min', counts: { words: 1, sentences: 1, paragraphs: 1, charsWithSpaces: 1, charsNoSpaces: 1 } }} />
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
