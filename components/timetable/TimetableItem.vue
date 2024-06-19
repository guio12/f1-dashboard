<script setup lang="ts">
const props = defineProps<{
  session: TimelineItemData
}>()

const splitDate = computed(() => {
  return typeof props.session.date === 'string' &&
    props.session.date.split(' ').length === 2
    ? props.session.date.split(' ')
    : null
})
</script>

<template>
  <section
    class="group mx-auto mt-1 flex items-center justify-between gap-4 rounded bg-gray-100 p-4 text-center md:w-3/4 dark:bg-gray-700"
  >
    <article v-if="splitDate" class="text-center text-xl">
      <time :datetime="props.session.date">
        <strong>{{ splitDate[0] }}</strong>
        <p>{{ splitDate[1] }}</p>
      </time>
    </article>
    <h2 class="text-wrap text-xl">{{ session.sessionName }}</h2>
    <time class="text-xl font-bold" :datetime="session.time">{{
      session.time
    }}</time>
  </section>
</template>
