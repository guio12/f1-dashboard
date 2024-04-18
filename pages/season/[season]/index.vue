<script setup lang="ts">
const { season } = useRoute().params

useHead({
  title: `Saison ${season}`,
})

const { data: seasonData } = await useFetch<GrandPrixOverviewData[]>(
  `/api/season/${season}`
)

// Date range picker
import { format } from 'date-fns'

const seasonStartDate = ref()
const seasonEndDate = ref()

if (seasonData.value) {
  seasonStartDate.value = new Date(seasonData.value[0].dateStart)
  seasonEndDate.value = new Date(
    seasonData.value[seasonData.value.length - 1].dateEnd
  )
}

const selectedDates = ref({
  start: seasonStartDate,
  end: seasonEndDate,
})

const selectAllSeasonRange = () => {
  selectedDates.value.start = seasonStartDate
  selectedDates.value.end = seasonEndDate
}

const filteredSeasonData = computed(() => {
  return seasonData.value?.filter((data) => {
    const selectedDateStart = new Date(selectedDates.value.start)
    const selectedDateEnd = new Date(selectedDates.value.end)
    const gpDateStart = new Date(data.dateStart)
    const gpDateEnd = new Date(data.dateEnd)

    if (selectedDateStart <= gpDateStart && selectedDateEnd >= gpDateEnd) {
      return data
    }
  })
})

const numberOfGPs = computed(() => {
  return filteredSeasonData.value ? filteredSeasonData.value.length : 0
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
      <template v-if="filteredSeasonData && filteredSeasonData?.length > 0">
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
