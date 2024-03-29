<script setup lang="ts">
const menuItems = [
  {
    label: 'Prochain Grand Prix',
    icon: 'i-heroicons-arrow-right-circle-solid',
    to: '/',
  },
  {
    label: 'Saison 2024',
    icon: 'i-heroicons-calendar-days-solid',
    to: '/season/2024',
  },
  {
    label: 'Saisons précédentes',
    icon: 'i-heroicons-archive-box-arrow-down-16-solid',
    to: '/past-seasons/',
  },
]

const isMobileMenuOpen = ref(false)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
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
      @click="isMobileMenuOpen = true"
    />
    <ClientOnly>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Theme"
        class="rounded-none border-gray-200 lg:me-10 lg:border-b dark:border-gray-800"
        @click="isDark = !isDark"
      />
      <template #fallback>
        <div class="h-8 w-8" />
      </template>
    </ClientOnly>
    <MenuMobile v-model="isMobileMenuOpen" :menu-items="menuItems" />
  </header>
</template>
