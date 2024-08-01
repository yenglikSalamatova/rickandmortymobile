<template>
  <div class="page-header">
    <h1 class="h1">Эпизоды</h1>
    <div class="results-info">{{ 0 }} результатов</div>
    <Episodes />
  </div>
</template>

<script setup lang="ts">
import Episodes from '@/components/episodes/EpisodesComponent.vue'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.title = 'Эпизоды | Веб приложение Рик и Морти'
})

onUnmounted(() => {
  document.title = 'Веб приложение Рик и Морти'
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
