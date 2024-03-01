<script setup lang="ts">
  const { data: races } = await useFetch('/api/season')

  const formatDate = (date: string) => useDateFormatter(date)
</script>

<template>
  <section v-for="race in races" :key="race.id" class="flex gap-2">
    <UCard>
      <template #header>
        <div>
          <p class="h-8">Prochain Grand Prix : {{ race?.name }}</p>
          <p>Nom officiel {{ race?.officialName }}</p>
        </div>
      </template>
      <div class="h-32">Date: {{ formatDate(race?.date) }}</div>
      <template #footer>
        <div class="h-8" />
      </template>
    </UCard>
  </section>
</template>
