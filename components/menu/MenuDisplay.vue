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
</script>

<template>
  <header class="bg-gray-800 px-10 py-3">
    <UHorizontalNavigation :links="menuItems" class="hidden lg:block" />
    <UButton
      icon="i-heroicons-bars-3-16-solid"
      class="lg:hidden"
      @click="isMobileMenuOpen = true"
    />
    <MenuMobile v-model="isMobileMenuOpen" :menu-items="menuItems" />
  </header>
</template>
