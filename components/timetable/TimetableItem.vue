<script setup lang="ts">
const props = defineProps<{
  session: TimelineItemData
}>()

const splitDate = computed(() => {
  if (typeof props.session.date === 'string') {
    return props.session.date.split(' ')
  } else {
    return ['', '']
  }
})
</script>

<template>
  <section
    class="group mx-auto mt-1 flex items-center justify-between gap-4 rounded bg-gray-100 p-4 text-center md:w-3/4 dark:bg-gray-700"
  >
    <article class="text-center text-xl">
      <time :datetime="`${splitDate[0]} ${splitDate[1]}`">
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
