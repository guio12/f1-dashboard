<script setup lang="ts">
  const { data: nextRace } = await useFetch('/api/next-race')

  const formatDate = (date: string) => useDateFormatter(date)
</script>

<template>
  <section class="flex gap-2">
    <UCard>
      <template #header>
        <div>
          <p class="h-8">Prochain Grand Prix : {{ nextRace?.name }}</p>
          <p>Nom officiel {{ nextRace?.officialName }}</p>
        </div>
      </template>
      <div class="h-32">Date: {{ formatDate(nextRace?.date) }}</div>
      <template #footer>
        <div class="h-8" />
      </template>
    </UCard>
  </section>
</template>
