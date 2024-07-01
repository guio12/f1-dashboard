<script setup lang="ts">
import type { NuxtError } from '#app'

useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900',
  },
})

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: null,
  },
})
</script>

<template>
  <NuxtLayout>
    <div class="mt-36 text-center">
      <h1>{{ error.statusCode }}</h1>

      <pre>{{ error }}</pre>
    </div>
  </NuxtLayout>
</template>
