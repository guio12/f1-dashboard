<script setup lang="ts">
  const { data: incomingGrandPrix } = await useFetch('/api/grand-prix/incoming-grand-prix')

  const formatDate = (date: string) => useDateFormatter(date)
</script>

<template>
  <section class="pt-4 m-auto">
    <UCard class="">
      <template #header>
        <div>
          <p class="h-8">Prochain Grand Prix : {{ incomingGrandPrix?.name }}</p>
          <p>Nom officiel {{ incomingGrandPrix?.officialName }}</p>
        </div>
      </template>
      <div class="h-32">
        <p>Date: {{ formatDate(incomingGrandPrix?.date) }}</p>
        <p>Ville {{ incomingGrandPrix?.location }}</p>
        <p>Pays {{ incomingGrandPrix?.countryName }}</p>
      </div>
      <template #footer>
        <div class="h-8">
          <UButton icon="i-heroicons-information-circle-solid" :to="`season-${incomingGrandPrix?.year}/grand-prix/${incomingGrandPrix?.id}`"
            >Détails du week-end</UButton
          >
        </div>
      </template>
    </UCard>
  </section>
</template>
