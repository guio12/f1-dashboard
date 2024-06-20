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

// Fonction générique pour créer une date à partir d'une string
const createDate = (dateString: string) => new Date(dateString)

// On vérifie si une date est dans une période donnée
const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean =>
  startDate <= date && endDate >= date

const seasonDataValues: GrandPrixOverviewData[] = Object.values(seasonData)

// On récupère les premières et dernières dates de la saison
const seasonStartDate: Ref<Date> = ref(
  createDate(seasonDataValues[0].dateStart)
)
const seasonEndDate: Ref<Date> = ref(
  createDate(seasonDataValues[seasonDataValues.length - 1].dateEnd)
)

interface SelectedDates {
  start: Date
  end: Date
}

const selectedDates: Ref<SelectedDates> = ref({
  start: seasonStartDate.value,
  end: seasonEndDate.value,
})

const selectAllSeasonRange = () => {
  selectedDates.value = {
    start: seasonStartDate.value,
    end: seasonEndDate.value,
  }
}

const filteredSeasonData = computed(() => {
  const selectedDateStart = selectedDates.value.start
  const selectedDateEnd = selectedDates.value.end

  return seasonDataValues.filter((data: GrandPrixOverviewData) => {
    const gpDateStart: Date = createDate(data.dateStart)
    const gpDateEnd: Date = createDate(data.dateEnd)

    return (
      isDateInRange(gpDateStart, selectedDateStart, selectedDateEnd) &&
      isDateInRange(gpDateEnd, selectedDateStart, selectedDateEnd)
    )
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

      <p class="mt-3 lg:mt-0">
        <span class="text-primary me-2 font-bold">{{ numberOfGPs }}</span>
        <span>Grand Prix durant cette période</span>
      </p>
    </section>

    <template v-if="filteredSeasonData && filteredSeasonData.length > 0">
      <section class="grid grid-cols-1 gap-10 lg:grid-cols-3">
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
      </section>
    </template>

    <template v-else>
      <p class="text-center">
        Aucun Grand Prix ne correspond aux critères sélectionnés
      </p>
    </template>
  </article>
</template>
