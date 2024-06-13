<script setup lang="ts">
const { isDesktop } = useDevice()

const props = defineProps<{
  grandPrixData: GrandPrixDetailsData
}>()

const { season, round, isSprintGrandPrix, fullSchedule, circuit } =
  props.grandPrixData

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() +
  name.slice(1).replace(/[A-Z]/g, (string) => ' ' + string.toUpperCase())

const formatToLongDate = (date: string) =>
  dateFormatter(date, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const formatToShortDate = (date: string) =>
  dateFormatter(date, {
    month: 'short',
    day: 'numeric',
  })

const formatTime = (date: string, time: string) =>
  timeFormatter(`${date}T${time}`)

const sessionsItems = Object.entries(fullSchedule).map(([session, data]) => ({
  sessionName: formatName(session),
  date: formatToShortDate(data?.date),
  heure: formatTime(data?.date, data?.time),
}))

const tabsItems = [
  {
    slot: 'sessions',
    label: 'Sessions',
  },
  {
    slot: 'map',
    label: 'Carte du circuit',
  },
  {
    slot: 'location',
    label: 'Localisation du circuit',
  },
]

const setTabsOrientation = computed(() => {
  return isDesktop ? 'horizontal' : 'vertical'
})
</script>

<template>
  <section class="pt-4">
    <UCard
      :ui="{
        background: 'border border-transparent bg-gray-50 dark:bg-slate-800',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      }"
    >
      <template #header>
        <section class="lg:px-9">
          <div class="justify-between text-xl lg:flex">
            <div class="flex justify-between">
              <span>Round {{ round }}</span>
              <UDivider
                orientation="vertical"
                size="md"
                class="mx-5"
                :ui="{
                  border: { base: 'flex border-gray-200 dark:border-gray-600' },
                }"
              />
              <span>Saison {{ season }}</span>
            </div>
            <UBadge v-if="isSprintGrandPrix" label="Sprint" size="md" />
          </div>
          <div class="justify-between lg:flex"></div>
          <div class="mt-5 text-xl lg:flex">
            <UIExternalLink :name="circuit.name" :url="circuit.url" />
            <UDivider
              orientation="vertical"
              size="md"
              class="mx-5"
              :ui="{
                border: { base: 'flex border-gray-200 dark:border-gray-600' },
              }"
            />
            <div>{{ circuit.locality }} - {{ circuit.country }}</div>
          </div>
          <div class="mt-5 flex justify-between">
            <p class="text-2xl font-bold">
              {{
                formatToLongDate(grandPrixData.fullSchedule.firstPractice.date)
              }}
              -
              {{ formatToLongDate(grandPrixData.fullSchedule.race.date) }}
            </p>
          </div>
        </section>
      </template>
      <section>
        <UContainer>
          <UTabs
            :items="tabsItems"
            :orientation="setTabsOrientation"
            :default-index="2"
            class="w-full"
            :ui="{
              list: {
                background: 'dark:bg-gray-700',
              },
            }"
          >
            <template #sessions>
              <div class="pt-5 lg:p-7">
                <TimetableItem
                  v-for="(session, index) in sessionsItems"
                  :key="index"
                  :session="session"
                />
              </div>
            </template>
            <template #map>
              <CircuitMap :circuit-name="circuit.name" class="pt-5 lg:p-7" />
            </template>
            <template #location>
              <CircuitCityLocation
                :latitude="circuit.latitude"
                :longitude="circuit.longitude"
                class="pt-5 lg:p-7"
              />
            </template>
          </UTabs>
        </UContainer>
      </section>
    </UCard>
  </section>
</template>
