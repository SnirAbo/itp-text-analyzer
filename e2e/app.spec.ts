import { test, expect } from '@playwright/test'

test('paste text and see counts update', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Text').fill('Hello world!\n\nThis is a test.')
  await expect(page.getByText('Words').locator('..').locator('div').nth(1)).toContainText('5')
  await expect(page.getByText('Sentences').locator('..').locator('div').nth(1)).not.toHaveText('0')
})
