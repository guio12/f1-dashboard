<script setup lang="ts">
  defineProps<{
    sessions: object
  }>()
</script>

<template>
  <div>Grand Prix Details</div>

  <div v-for="session in sessions" :key="session.sessionId">
    <div>{{ session.sessionName }}</div>
    <div>{{ session.sessionType }}</div>
    <div>{{ session.dateStart }}</div>
    <div>{{ session.dateEnd }}</div>
  </div>
</template>
