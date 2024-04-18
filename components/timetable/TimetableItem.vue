<script setup lang="ts">
const props = defineProps<{
  session: TimelineItemData
}>()

const splitDate = computed(() => {
  return props.session.date.split(' ')
})
</script>

<template>
  <div
    class="group mx-auto mt-1 flex items-center justify-between rounded bg-gray-400 p-4 md:w-3/4"
  >
    <div class="text-center text-xl">
      <div class="font-bold">{{ splitDate[0] }}</div>
      <div>{{ splitDate[1] }}</div>
    </div>
    <div class="text-xl">{{ session.sessionName }}</div>
    <div class="text-xl font-bold">{{ session.heure }}</div>
  </div>
</template>
