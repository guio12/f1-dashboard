<script setup lang="ts">
const { season, round } = useRoute().params
const { data: grandPrixData } = await useFetch<GrandPrixDetailsData>(
  `/api/season/${season}/grand-prix/${round}`
)

useHead({
  title: `Saison ${season} | ${grandPrixData.value?.name}`,
})
</script>

<template>
  <article v-if="grandPrixData">
    <h1>
      <NuxtLink :to="grandPrixData?.url">{{ grandPrixData?.name }}</NuxtLink>
    </h1>
    <h2>Saison {{ season }} | Round {{ round }}</h2>

    <section>
      <GrandPrixDetails :grand-prix-data="grandPrixData" />
    </section>
  </article>
</template>
