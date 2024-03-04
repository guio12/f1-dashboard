<script setup lang="ts">
  const { id } = useRoute().params
  const { data: sessions } = await useFetch(`/api/grand-prix/${id}`)

  //const { location, countryName, year } = sessions
  console.log('sessions', sessions);

  // UTILISER PINIA/STORE POUR RECUP location, countryName et year ??
</script>

<template>
  <div>
    <div>Ville : {{ location }}</div>
    <div>Pays : {{ countryName }}</div>
    <div>Saison : {{ year }}</div>
    <GrandPrixDetails :sessions="sessions" />
  </div>
</template>
