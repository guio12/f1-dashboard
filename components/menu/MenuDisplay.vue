<script setup lang="ts">
const route = useRoute()

const menuItems = [
  {
    label: 'Prochain Grand Prix',
    icon: 'i-heroicons-arrow-right-circle-solid',
    to: '/',
    get active() {
      return route.matched.some(record => record.path === '/')
    },
  },
  {
    label: 'Saisons',
    icon: 'i-heroicons-calendar-days-solid',
    to: '/season/2024',
    get active() {
      return route.matched.some(record => record.path.startsWith('/season/'))
    },
  },
]

const isMobileMenuOpen = ref(false)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="flex justify-between border-b border-gray-200 px-5 lg:justify-normal lg:px-0 dark:border-gray-800"
  >
    <UHorizontalNavigation :links="menuItems" class="hidden ps-10 lg:block">
      <template #default="{ link }">
        <span class="relative py-2">{{ link.label }}</span>
      </template>

      <template #icon="{ link }">
        <span :class="link.icon" class="group-hover:text-primary"></span>
      </template>
    </UHorizontalNavigation>
    <UButton
      icon="i-heroicons-bars-3-16-solid"
      class="my-5 me-10 lg:my-0 lg:hidden"
      aria-label="Menu mobile"
      @click="isMobileMenuOpen = true"
    />
    <ClientOnly>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Changer le thème"
        class="h-10 self-center lg:me-10 dark:border-gray-800"
        @click="toggleColorMode"
      />
      <template #fallback>
        <div class="h-8 w-8" />
      </template>
    </ClientOnly>
    <MenuMobile v-model="isMobileMenuOpen" :menu-items="menuItems" />
  </header>
</template>
