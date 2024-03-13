<script setup lang="ts">
  useHead({
    title: 'Prochain Grand Prix',
  })

  const { data: incomingGrandPrixData } = await useFetch<GrandPrixDetailsData>(
    '/api/incoming-grand-prix'
  )
</script>

<template>
  <article class="">
    <h1>{{ incomingGrandPrixData?.name }}</h1>
    <h2>
      Saison {{ incomingGrandPrixData?.season }} | Round
      {{ incomingGrandPrixData?.round }}
    </h2>

    <section v-if="incomingGrandPrixData">
      <GrandPrixDetails :grand-prix-data="incomingGrandPrixData" />
    </section>
  </article>
</template>
