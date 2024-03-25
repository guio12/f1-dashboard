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
</script>

<template>
  <aside
    class="sidebar invisible fixed h-full w-auto bg-gray-800 p-7 lg:visible"
  >
    <UVerticalNavigation :links="menuItems" />
  </aside>

  <header class="bg-gray-800 lg:invisible">
    <UHorizontalNavigation :links="menuItems" />
  </header>
</template>
