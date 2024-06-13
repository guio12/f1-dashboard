// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/ui', 'nuxt3-leaflet', '@nuxtjs/device', '@nuxt/fonts'],
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
