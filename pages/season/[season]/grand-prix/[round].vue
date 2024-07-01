<script setup lang="ts">
const { season, round } = useRoute().params

const key = `/api/season/${season}/grand-prix/${round}`

const grandPrixData = await fetchWithCache<GrandPrixDetailsData>(
  useNuxtApp(),
  key
)

useHead({
  title: `Saison ${season} | ${grandPrixData?.name}`,
})
</script>

<template>
  <article v-if="grandPrixData" class="page-container">
    <section class="mx-auto lg:max-w-4xl">
      <h1 class="flex items-center self-center">
        <UIcon
          :name="matchCountryFlag(grandPrixData.circuit.country)"
          aria-label="Drapeau du pays du Grand Prix"
          class="me-4 text-4xl"
        />
        <UIExternalLink :name="grandPrixData.name" :url="grandPrixData.url" />
      </h1>
      <GrandPrixDetails :grand-prix-data="grandPrixData" />
    </section>
  </article>
</template>
