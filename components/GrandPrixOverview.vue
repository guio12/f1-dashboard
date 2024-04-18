<script setup lang="ts">
defineProps<{
  season: string
  round: string
  name: string
  circuitName: string
  countryName: string
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
    <ULink :to="`/season/${season}/grand-prix/${round}`">
      <UCard
        :ui="{ background: 'bg-gray-50 dark:bg-gray-900' }"
        class="border border-transparent hover:border-green-400"
      >
        <template #header>
          <div>
            <div class="flex items-start justify-between">
              <div>
                <UIcon
                  :name="matchCountryFlag(countryName)"
                  class="me-2 align-text-bottom text-2xl"
                />
                <span class="text-xl">{{ name }}</span>
              </div>
              <UBadge v-if="isSprintGrandPrix" label="Sprint" />
            </div>
            <div class="flex h-8 items-center justify-between">
              <span>Round {{ round }}</span>
              <UDivider
                orientation="vertical"
                size="lg"
                class="mx-5 text-red-600"
              />
              <span class="font-bold">
                {{ formatDate(dateStart) }} -
                {{ formatDate(dateEnd) }}
              </span>
            </div>
          </div>
          <div class="h-6">
            <span>Départ de la course à </span>
            <span class="font-bold">{{ formatTime(dateEnd, time) }}</span>
          </div>
        </template>
        <CircuitMap :circuit-name="circuitName" />
      </UCard>
    </ULink>
  </section>
</template>
