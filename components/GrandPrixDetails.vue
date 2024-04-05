<script setup lang="ts">
const props = defineProps<{
  grandPrixData: GrandPrixDetailsData
}>()

const { isSprintGrandPrix, fullSchedule, circuit } = props.grandPrixData

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() +
  name.slice(1).replace(/[A-Z]/g, (string) => ' ' + string.toUpperCase())

const formatDate = (date: string) => dateFormatter(date)
const formatTime = (date: string, time: string) =>
  timeFormatter(`${date}T${time}`)

const sessionsItems = Object.entries(fullSchedule).map(([session, data]) => ({
  Session: formatName(session),
  Date: formatDate(data?.date),
  Heure: formatTime(data?.date, data?.time),
}))

const sort = ref({
  column: ['Date'],
  direction: 'desc',
})
</script>

<template>
  <section class="m-auto pt-4">
    <UCard class="">
      <template #header>
        <div>
          <p>{{ circuit.locality }} - {{ circuit.country }}</p>
        </div>
        <div>
          <ULink :to="circuit.url" target="_blank">{{ circuit.name }}</ULink>
        </div>
        <div>
          <p>
            {{ formatDate(fullSchedule.firstPractice.date) }} -
            {{ formatDate(fullSchedule.race.date) }}
          </p>
          <UBadge v-if="isSprintGrandPrix" label="Sprint" />
        </div>
      </template>

      <div class="h-32"></div>

      <template #footer>
        <div class="">
          <UTable :rows="sessionsItems" :sort="sort"></UTable>
        </div>
      </template>
    </UCard>
  </section>
</template>
