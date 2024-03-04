<script setup lang="ts">
  defineProps<{
    id: number
    name: string
    officialName: string
    date: string
    year: number
  }>()

  const formatDate = (date: string) => useDateFormatter(date)
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <p class="h-8">Grand Prix : {{ name }}</p>
        <p>Nom officiel {{ officialName }}</p>
      </div>
    </template>
    <div class="h-32">Date: {{ formatDate(date) }}</div>
    <template #footer>
      <div class="h-8">
        <UButton icon="i-heroicons-information-circle-solid" :to="`grand-prix/${id}`"
          >Détails du week-end</UButton
        >
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
