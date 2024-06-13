<script setup lang="ts">
defineProps<{
  menuItems: MenuItems[]
}>()

const isMobileMenuOpen = defineModel({ type: Boolean, default: false })
</script>

<template>
  <USlideover
    v-model="isMobileMenuOpen"
    side="left"
    :ui="{ width: 'max-w-[65%] md:max-w-[35%] lg:max-w-[20%]' }"
  >
    <UVerticalNavigation :links="menuItems" class="ps-7 pt-7">
      <template #default="{ link }">
        <span
          class="group-hover:text-primary relative"
          @click="isMobileMenuOpen = false"
        >
          {{ link.label }}
        </span>
      </template>
    </UVerticalNavigation>
  </USlideover>
</template>
