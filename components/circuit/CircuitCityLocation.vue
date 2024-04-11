<script setup lang="ts">
defineProps<{
  latitude: string,
  longitude: string
}>()

const zoom = ref(5)
</script>

<template>
  <div class="h-96 w-1/2 mx-auto my-10">
    <LMap ref="map" :zoom="zoom" :point="[latitude, longitude]" :center="[latitude, longitude]">
      <LTileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="[latitude, longitude]" />
    </LMap>
  </div>
</template>
