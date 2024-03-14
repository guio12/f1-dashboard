<script setup lang="ts">
  const props = defineProps<{
    grandPrixData: GrandPrixDetailsData
  }>()

  const { season, round, url, name, isSprintGrandPrix, fullSchedule, circuit } =
    props.grandPrixData

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
          <ULink :to="url" class="link">{{ name }}</ULink>
          <p class="h-8">Saison {{ season }} - Round {{ round }}</p>
          <UBadge v-if="isSprintGrandPrix" label="Sprint" />
        </div>
      </template>

      <div class="h-32">
        <div>
          <p>{{ circuit.locality }} - {{ circuit.country }}</p>
        </div>
        <div>
          <ULink :to="circuit.url">{{ circuit.name }}</ULink>
        </div>
        <div>
          <p>
            {{ formatDate(fullSchedule.firstPractice.date) }} -
            {{ formatDate(fullSchedule.race.date) }}
          </p>
          <p>
            Heure de début:
            {{ formatTime(fullSchedule.race.date, fullSchedule.race.time) }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="">
          <UTable :rows="sessionsItems" :sort="sort"></UTable>
        </div>
      </template>
    </UCard>
  </section>
</template>
