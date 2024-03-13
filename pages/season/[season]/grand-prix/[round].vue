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
  <article>
    <h1>{{ grandPrixData?.name }}</h1>
    <h2>Saison {{ season }} | Round {{ round }}</h2>

    <section v-if="grandPrixData">
      <GrandPrixDetails :grand-prix-data="grandPrixData" />
    </section>
  </article>
</template>
