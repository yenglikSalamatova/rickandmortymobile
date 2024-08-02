<template>
  <div class="page-header">
    <h1 class="h1">Локации</h1>
    <div class="results-info">{{ totalCount }} результатов</div>
  </div>
  <LocationsComponent />
</template>

<script setup>
import LocationsComponent from '@/components/locations/LocationsComponent.vue'
import { onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const totalCount = computed(() => store.state.locationsModule.totalCount)

onMounted(() => {
  document.title = 'Локации | Веб приложение Рик и Морти'
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
