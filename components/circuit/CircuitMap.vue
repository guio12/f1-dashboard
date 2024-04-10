<script setup lang="ts">
defineProps<{
  circuitName: string
}>()

const formatCircuitName = (name: string) => `/img/${slugify(name)}.webp`
</script>

<template>
  <figure>
    <img
      :src="formatCircuitName(circuitName)"
      :alt="circuitName"
      :title="circuitName"
      class="m-auto p-5"
    />
    <figcaption class="text-center text-sm italic">© FIA</figcaption>
  </figure>
</template>
