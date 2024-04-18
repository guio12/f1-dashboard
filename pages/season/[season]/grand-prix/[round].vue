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
  <article v-if="grandPrixData" class="page-container">
    <section class="mx-auto lg:max-w-4xl">
      <div class="flex items-center">
        <UIcon :name="matchCountryFlag(grandPrixData.circuit.country)" class="text-4xl me-4" />
        <h1 class="self-center">
          <UIExternalLink :name="grandPrixData.name" :url="grandPrixData.url" />
        </h1>
      </div>
      <GrandPrixDetails :grand-prix-data="grandPrixData" />
    </section>
  </article>
</template>
