<script setup lang="ts">
const props = defineProps<{
  latitude: string
  longitude: string
}>()

const zoom = ref(6)
const tileLayerUrl =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'

const numericLatitude = computed(() => parseFloat(props.latitude))
const numericLongitude = computed(() => parseFloat(props.longitude))
</script>

<template>
  <div class="mx-auto mt-3 h-96 md:w-3/4">
    <LMap
      ref="map"
      :zoom="zoom"
      :point="[numericLatitude, numericLongitude]"
      :center="[numericLatitude, numericLongitude]"
      aria-label="Carte affichant la localisation d'un circuit"
    >
      <LTileLayer
        :url="tileLayerUrl"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="[numericLatitude, numericLongitude]" />
    </LMap>
  </div>
</template>

<style scoped>
/* Hack pour éviter que la carte soit affichée par dessus le menu
*  https://github.com/stlbucket/nuxt-ui-modal-leaflet-overlay-bug/issues/1
*/
.leaflet-container {
  z-index: 0 !important;
}
</style>
