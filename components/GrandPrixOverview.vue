<script setup lang="ts">
defineProps<{
  season: string
  round: string
  name: string
  dateStart: string
  dateEnd: string
  time: string
  isSprintGrandPrix: boolean
  url: string
}>()

const formatDate = (date: string) => dateFormatter(date)
const formatTime = (date: string, time: string) =>
  timeFormatter(`${date}T${time}`)
</script>

<template>
  <section>
    <UCard>
      <template #header>
        <div>
          <ULink :to="url" class="link">{{ name }}</ULink>

          <div class="flex items-start justify-between">
            <p class="h-8">Round {{ round }}</p>
            <UBadge v-if="isSprintGrandPrix" label="Sprint" />
          </div>
        </div>
      </template>
      <div class="h-8">
        {{ formatDate(dateStart) }} - {{ formatDate(dateEnd) }}
      </div>
      <div class="h-8">
        Départ de la course à {{ formatTime(dateEnd, time) }}
      </div>
      <template #footer>
        <div class="h-8">
          <UButton
            icon="i-heroicons-information-circle-solid"
            :to="`/season/${season}/grand-prix/${round}`"
            >Détails du Grand Prix</UButton
          >
        </div>
      </template>
    </UCard>
  </section>
</template>
