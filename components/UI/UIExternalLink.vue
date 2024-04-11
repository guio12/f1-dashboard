<script setup lang="ts">
defineProps<{
  url: string
  name: string
}>()
</script>

<template>
  <ULink :to="url" target="_blank" class="link inline-flex items-center">
    {{ name }}
    <UIcon name="i-heroicons-arrow-top-right-on-square-16-solid" class="ms-1" />
  </ULink>
</template>
