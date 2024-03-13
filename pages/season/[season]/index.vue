<script setup lang="ts">
  const { season } = useRoute().params

  useHead({
    title: `Saison ${season}`,
  })

  const { data: seasonData } = await useFetch<GrandPrixOverviewData[]>(
    `/api/season/${season}`
  )
</script>

<template>
  <article class="mt-5 grid grid-cols-2 gap-10">
    <h1>Saison {{ season }}</h1>

    <section v-for="grandPrix in seasonData" :key="grandPrix.round">
      <GrandPrixOverview
        :season="grandPrix.season"
        :round="grandPrix.round"
        :name="grandPrix.name"
        :date-start="grandPrix.dateStart"
        :date-end="grandPrix.dateEnd"
        :time="grandPrix.time"
        :is-sprint-grand-prix="grandPrix.isSprintGrandPrix"
        :url="grandPrix.url"
      />
    </section>
  </article>
</template>
