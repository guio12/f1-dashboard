import { mountSuspended } from '@nuxt/test-utils/runtime'
import { test, describe, expect } from 'vitest'
import MenuDisplay from '@/components/menu/MenuDisplay.vue'

describe('MenuDisplay', () => {
  test('renders the component', async () => {
    const component = await mountSuspended(MenuDisplay)
    expect(component.text()).toContain('Saisons')
  })
})
