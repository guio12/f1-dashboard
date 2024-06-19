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
    default: null
  }
})
</script>

<template>
  <NuxtLayout>
    <div class="text-center mt-36">
      <h1>{{ error.statusCode }}</h1>

      <pre>{{ error }}</pre>
    </div>
  </NuxtLayout>
</template>
