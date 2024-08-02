<template>
  <div class="page-header">
    <h1 class="h1">{{ $t('episodes.title') }}</h1>
    <div class="results-info">{{ totalCount }} results</div>
  </div>
  <Episodes />
</template>

<script setup lang="ts">
import Episodes from '@/components/episodes/EpisodesComponent.vue'
import { onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const totalCount = computed(() => store.state.episodesModule.totalCount)

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
