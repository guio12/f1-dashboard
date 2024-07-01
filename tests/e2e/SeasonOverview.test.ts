import { expect, test } from '@nuxt/test-utils/playwright'

test.setTimeout(120000) // 2 minutes

test('Season 2024 route then click on 2023', async ({ page, goto }) => {
  await goto('/season/2024', { waitUntil: 'hydration' })
  await page.getByRole('link', { name: '2023' }).click()
  await expect(page.getByText('Saison 2023')).toBeVisible()
})

test.describe('Lien prochain Grand Prix - Desktop', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })

  test('Lien prochain Grand Prix - Desktop', async ({ page, goto }) => {
    await goto('/season/2024', { waitUntil: 'hydration' })
    await page.getByRole('link', { name: 'Prochain Grand Prix' }).click()
    await expect(page).toHaveURL('/')
  })
})

// TODO: checker s'il y a pas une meilleure façon de tester le mobile
test.describe('Lien prochain Grand Prix - Mobile', () => {
  test.use({ viewport: { width: 414, height: 896 } })

  // En mobile, on doit passer par un menu burger pour accéder au lien
  test('Lien prochain Grand Prix - Mobile', async ({ page, goto }) => {
    await goto('/season/2024', { waitUntil: 'hydration' })
    await page.getByLabel('Menu mobile').click()
    await page.getByRole('link', { name: 'Prochain Grand Prix' }).click()
    await expect(page).toHaveURL('/')
  })
})

test('Season 2023 title', async ({ page, goto }) => {
  await goto('/season/2023', { waitUntil: 'hydration' })
  await expect(page).toHaveTitle('Saison 2023')
})

test('Click on GP link - 1', async ({ page, goto }) => {
  await goto('/season/2024', { waitUntil: 'hydration' })
  const link = page.getByRole('heading', {
    level: 2,
    name: 'Australian Grand Prix',
  })
  link.click()
  await expect(page).toHaveURL('/season/2024/grand-prix/3')
})

test('Click on GP link - 2', async ({ page, goto }) => {
  await goto('/season/2024', { waitUntil: 'hydration' })
  const link = page.getByRole('heading', {
    level: 2,
    name: 'Australian Grand Prix',
  })
  link.click()
  await expect(page.getByText('Albert Park Grand Prix Circuit')).toBeVisible()
})

test('Date Picker - 1', async ({ page, goto }) => {
  await goto('/season/2024', { waitUntil: 'hydration' })
  await page.getByTestId('datepicker').click()
  await page.getByLabel('Thursday, Feb 1,').click()
  await page.getByLabel('Friday, Feb 2,').click()
  await expect(
    page.getByText('Aucun Grand Prix ne correspond aux critères sélectionnés')
  ).toBeVisible()
})

test('Date Picker - 2', async ({ page, goto }) => {
  await goto('/season/2024', { waitUntil: 'hydration' })
  await page.getByTestId('datepicker').click()
  await page.getByLabel('Thursday, Feb 1,').click()
  await page.getByLabel('Sunday, Mar 31,').click()
  await expect(
    page.locator('p:has-text("3 Grand Prix durant cette période")')
  ).toBeVisible()
})
