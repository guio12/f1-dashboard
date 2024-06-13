<script setup lang="ts">
useHead({
  title: 'Prochain Grand Prix',
})

const key = '/api/incoming-grand-prix'

const incomingGrandPrixData = await fetchWithCache<GrandPrixDetailsData>(
  useNuxtApp(),
  key
)
</script>

<template>
  <article v-if="incomingGrandPrixData" class="page-container">
    <section class="mx-auto lg:max-w-4xl">
      <h1>
        <UIExternalLink
          :name="incomingGrandPrixData.name"
          :url="incomingGrandPrixData.url"
        />
      </h1>
      <GrandPrixDetails :grand-prix-data="incomingGrandPrixData" />
    </section>
  </article>
</template>
