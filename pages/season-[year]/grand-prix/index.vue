<script setup lang="ts">
  const { year } = useRoute().params

  useHead({
    title: `Saison ${year}`,
  })

  const { data: grandPrix } = await useFetch(`/api/season/${year}`)
</script>

<template>
  <div class="mt-5 grid grid-cols-2 gap-10">
    <section v-for="gp in grandPrix" :key="gp.id">
      <GrandPrixOverview
        :id="gp.id"
        :name="gp.name"
        :official-name="gp.officialName"
        :date="gp.date"
        :year="gp.year"
      />
    </section>
  </div>
</template>
