import { expect, test } from '@playwright/test'

test('fetching more works fine', async ({ page }) => {
	await page.goto('/')
	expect(await page.getByRole('article').count()).toBe(1)

	await page.getByRole('button', { name: '+' }).click()
	const loadingIndicator = page.getByRole('button', { name: '...' })
	expect(await loadingIndicator.isDisabled()).toBe(true)

	await loadingIndicator.waitFor({ state: 'detached' })
	expect(await page.getByRole('article').count()).toBe(2)
})
