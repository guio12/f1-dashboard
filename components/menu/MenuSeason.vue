<script setup lang="ts">
const links = [
  {
    label: '2022',
    to: '/season/2022',
  },
  {
    label: '2023',
    to: '/season/2023',
  },
  {
    label: '2024',
    to: '/season/2024',
  },
]
</script>

<template>
  <UHorizontalNavigation
    :links="links"
    class="max-w-fit border-b border-gray-200 dark:border-gray-800"
  />
</template>
