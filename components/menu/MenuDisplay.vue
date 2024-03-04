<script setup lang="ts">
  const menuItems = [
    {
      label: 'Prochain Grand Prix',
      icon: 'i-heroicons-arrow-right-circle-solid',
      to: '/',
    },
    {
      label: 'Saisons',
      icon: 'i-heroicons-calendar-days-solid',
      to: '/season-2023/grand-prix',
    },
  ]

  const items = [
    {
      label: 'Saisons',
      icon: 'i-heroicons-information-circle',
      defaultOpen: true,
      slot: 'seasons',
    },
  ]
</script>

<template>
  <aside
    class="sidebar invisible fixed h-full w-auto bg-gray-800 p-7 lg:visible"
  >
    <!-- <UVerticalNavigation :links="links" /> -->
    <!-- <template v-for="item in menuItems" :key="item.label">
      <MenuLink :route="item.to" :label="item.label" :icon="item.icon" />
    </template> -->

    <div>
      <UButton
        to="/"
        label="Prochain Grand Prix"
        icon="i-heroicons-arrow-right-circle-solid"
      />
      <!-- <ULink
        to="/"
        class="p-2 hover:bg-green-400"
        active-class="text-primary bg-primary-950"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >Prochaine course</ULink
      > -->
    </div>
    <div class="mt-5">
      <UAccordion :items="items">
        <template #seasons>
          <div class="text-center">
            <ULink to="/season-2024/grand-prix">2024</ULink>
          </div>
          <div class="text-center">
            <ULink to="/season-2023/grand-prix">2023</ULink>
          </div>
        </template>
      </UAccordion>
    </div>
  </aside>

  <header class="bg-gray-800 lg:invisible">
    <UHorizontalNavigation :links="menuItems" />
  </header>
</template>
