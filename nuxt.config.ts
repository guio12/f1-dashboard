// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', 'nuxt3-leaflet', '@nuxt/fonts'],
  imports: {
    dirs: ['types'],
  },
  typescript: {
    typeCheck: false,
    strict: true,
  },
  css: ['~/assets/css/main.css'],
  ui: {
    icons: ['heroicons', 'flag'],
  },
})
