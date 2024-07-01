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
    <ULink
      :to="`/season/${season}/grand-prix/${round}`"
      :aria-label="`Details for ${name}, Season ${season}, Round ${round}`"
    >
      <UCard
        :ui="{
          background:
            'border border-transparent bg-gray-50 dark:bg-slate-800 hover:border-green-400',
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        }"
      >
        <template #header>
          <h2 class="mb-2 flex h-12 items-start justify-between xl:h-auto">
            <div class="flex items-center">
              <UIcon
                :name="matchCountryFlag(countryName)"
                class="me-2 align-text-bottom text-2xl"
                aria-label="Drapeau du pays du Grand Prix"
              />
              <span class="text-xl">{{ name }}</span>
            </div>
            <UBadge
              v-if="isSprintGrandPrix"
              class="hidden xl:inline-block"
              label="Sprint"
            />
          </h2>
          <div class="xl:flex">
            <div class="mb-2 flex justify-between">
              <span>Round {{ round }}</span>
              <UDivider
                orientation="vertical"
                size="md"
                class="mx-5 hidden xl:inline-block"
                :ui="{
                  border: {
                    base: 'flex border-gray-200 dark:border-gray-600',
                  },
                }"
              />
              <UBadge
                v-if="isSprintGrandPrix"
                class="xl:hidden"
                label="Sprint"
              />
            </div>
            <p class="font-bold">
              {{ formatDate(dateStart) }} -
              {{ formatDate(dateEnd) }}
            </p>
          </div>
          <p class="hidden xl:inline-block">
            <span>Départ de la course à </span>
            <span class="font-bold">{{ formatTime(dateEnd, time) }}</span>
          </p>
        </template>
        <CircuitMap :circuit-name="circuitName" />
      </UCard>
    </ULink>
  </section>
</template>
