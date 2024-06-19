<script setup lang="ts">
defineProps<{
  circuitName: string
}>()

const formatCircuitName = (name: string) => `/img/${slugify(name)}.webp`
const imageError = ref(false)
const handleError = () => {
  imageError.value = true
}
</script>

<template>
  <figure v-if="!imageError">
    <img
      :src="formatCircuitName(circuitName)"
      :alt="`Carte du circuit de ${circuitName}`"
      :title="circuitName"
      class="m-auto"
      @error="handleError"
    />
    <figcaption class="text-center text-sm italic">© FIA</figcaption>
  </figure>
  <div v-else class="m-auto h-10 text-center">Image introuvable</div>
</template>
