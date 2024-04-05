<script setup lang="ts">
defineProps<{
  season: string
  round: string
  name: string
  circuitName: string
  dateStart: string
  dateEnd: string
  time: string
  isSprintGrandPrix: boolean
  url: string
}>()

const formatDate = (date: string) => dateFormatter(date)
const formatTime = (date: string, time: string) =>
  timeFormatter(`${date}T${time}`)

const formatCircuitName = (name: string) => `/img/${slugify(name)}.webp`
</script>

<template>
  <section>
    <UCard :ui="{ background: 'bg-gray-50 dark:bg-gray-900' }">
      <template #header>
        <div>
          <div class="flex items-start justify-between">
            <ULink :to="url" target="_blank" class="link flex items-center"
              >{{ name }}
              <UIcon
                name="i-heroicons-arrow-top-right-on-square-16-solid"
                class="ms-1"
            /></ULink>
            <UBadge v-if="isSprintGrandPrix" label="Sprint" />
          </div>

          <div class="flex justify-between items-center h-8">
            <span>Round {{ round }}</span>
            <Icon name="i-heroicons-arrow-right-solid" />
            <span class="font-bold">
              {{ formatDate(dateStart) }} -
              {{ formatDate(dateEnd) }}
            </span>
          </div>
        </div>
        <div class="h-6">
          <span>Départ de la course à</span> <span class="font-bold">{{ formatTime(dateEnd, time) }}</span>
        </div>
      </template>
      <figure>
        <img
          :src="formatCircuitName(circuitName)"
          :alt="circuitName"
          :title="circuitName"
        />
        <figcaption class="text-center text-sm italic">© FIA</figcaption>
      </figure>
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
