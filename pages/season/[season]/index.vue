<script setup lang="ts">
import { format } from 'date-fns'

const { season } = useRoute().params

useHead({
  title: `Saison ${season}`,
})

const key = `/api/season/${season}`

const seasonData = await fetchWithCache<Record<string, GrandPrixOverviewData>>(
  useNuxtApp(),
  key
)

// Récupération des dates de début et de fin (premier et dernier objets)
const seasonStartDate = ref(new Date(Object.values(seasonData)[0].dateStart))
const seasonEndDate = ref(
  new Date(
    Object.values(seasonData)[Object.values(seasonData).length - 1].dateEnd
  )
)

const selectedDates = ref({
  start: seasonStartDate.value,
  end: seasonEndDate.value,
})

const selectAllSeasonRange = () => {
  selectedDates.value.start = seasonStartDate.value
  selectedDates.value.end = seasonEndDate.value
}

// Filtre les données de la saison en fonction des dates sélectionnées
const filteredSeasonData = computed(() => {
  return Object.values(seasonData).filter((data) => {
    const selectedDateStart = new Date(selectedDates.value.start)
    const selectedDateEnd = new Date(selectedDates.value.end)
    const gpDateStart = new Date(data.dateStart)
    const gpDateEnd = new Date(data.dateEnd)

    return selectedDateStart <= gpDateStart && selectedDateEnd >= gpDateEnd
  })
})

const numberOfGPs = computed(() => {
  return filteredSeasonData.value.length
})
</script>

<template>
  <article class="page-container">
    <MenuSeason />

    <h1>Saison {{ season }}</h1>

    <section class="my-10 justify-between lg:flex">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid">
          {{ format(selectedDates.start, 'd MMM, yyy') }} -
          {{ format(selectedDates.end, 'd MMM, yyy') }}
        </UButton>
        <template #panel="{ close }">
          <div
            class="inline-block items-center divide-gray-200 sm:divide-x lg:flex dark:divide-gray-800"
          >
            <div class="flex-col py-4 sm:flex">
              <UButton
                label="Saison entière"
                color="gray"
                variant="ghost"
                icon="i-heroicons-calendar-days-20-solid"
                class="self-center rounded-none px-6"
                truncate
                @click="selectAllSeasonRange()"
              />
            </div>
            <UIDatePicker v-model="selectedDates" @close="close" />
          </div>
        </template>
      </UPopover>

      <div class="mt-3 lg:mt-0">
        <span class="text-primary me-1 font-bold">{{ numberOfGPs }}</span>
        <span>Grand Prix durant cette période</span>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <template v-if="filteredSeasonData && filteredSeasonData.length > 0">
        <GrandPrixOverview
          v-for="grandPrix in filteredSeasonData"
          :key="grandPrix.round"
          :season="grandPrix.season"
          :round="grandPrix.round"
          :name="grandPrix.name"
          :circuit-name="grandPrix.circuitName"
          :country-name="grandPrix.countryName"
          :date-start="grandPrix.dateStart"
          :date-end="grandPrix.dateEnd"
          :time="grandPrix.time"
          :is-sprint-grand-prix="grandPrix.isSprintGrandPrix"
          :url="grandPrix.url"
        />
      </template>

      <template v-else>
        <p>Aucun Grand Prix ne correspond aux critères sélectionnés</p>
      </template>
    </section>
  </article>
</template>
