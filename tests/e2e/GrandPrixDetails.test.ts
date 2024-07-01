import { expect, test } from '@nuxt/test-utils/playwright'

test.setTimeout(120000) // 2 minutes

test('Localisation du circuit', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('tab', { name: 'Localisation du circuit' }).click()
  await expect(
    page.getByLabel("Carte affichant la localisation d'un circuit")
  ).toBeVisible()
})

test('Carte du circuit', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('tab', { name: 'Carte du circuit' }).click()
  await expect(page.getByAltText('Carte du circuit de')).toBeVisible()
})

test('Sessions', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('tab', { name: 'Sessions' }).click()
  await expect(page.getByText('First Practice')).toBeVisible()
})
