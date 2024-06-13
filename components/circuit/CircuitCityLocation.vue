<script setup lang="ts">
defineProps<{
  latitude: string
  longitude: string
}>()

const zoom = ref(6)
</script>

<template>
  <div class="mx-auto h-96">
    <LMap
      ref="map"
      :zoom="zoom"
      :point="[latitude, longitude]"
      :center="[latitude, longitude]"
    >
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
