import { useFetch } from '#app'
import type { NuxtApp } from '#app'

interface CachedData {
  fetchedAt: string
  [key: string]: any
}

export async function fetchWithCache<T>(
  nuxtApp: NuxtApp,
  url: string
): Promise<T> {
  if (!nuxtApp) {
    throw new Error('instance Nuxt app indisponible')
  }

  const { data, error } = await useFetch(url, {
    headers: {
      Accept: 'application/json',
    },
    transform(input: unknown): T {
      return input as T
    },
    getCachedData(key: string): T | undefined {
      const data: CachedData =
        nuxtApp.payload?.data[key] || nuxtApp.static?.data[key]
      // Si les données n'ont pas encore été fetch
      if (!data) {
        // Fetch pour la première fois
        return
      }

      // Est-ce que les données sont trop anciennes ?
      const expirationDate = new Date(new Date().toISOString())
      expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 1000) // 10 minutes cache
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        // On refetch les données
        return
      }

      return data as T
    },
  })

  if (error.value) {
    throw new Error(error.value as unknown as string)
  }

  return data.value as T
}
