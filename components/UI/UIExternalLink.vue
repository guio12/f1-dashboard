<script setup lang="ts">
defineProps<{
  url: string
  name: string
}>()
</script>

<template>
  <div class="inline-flex items-center">
    <ULink :to="url" target="_blank" class="link">
      {{ name }}
    </ULink>
    <UIcon name="i-heroicons-arrow-top-right-on-square-16-solid" class="ms-1" />
  </div>
</template>
