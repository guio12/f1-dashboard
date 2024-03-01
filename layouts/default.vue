<script setup lang="ts">
  const links = [
    {
      label: 'Prochaine course',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'Saisons',
      icon: 'i-heroicons-chart-bar',
      to: '/season/races',
    },
  ]
</script>

<template>
  <div class="flex">
    <nav class="bg-white p-3">
      <UVerticalNavigation :links="links" />
    </nav>
    <slot />
  </div>
</template>
