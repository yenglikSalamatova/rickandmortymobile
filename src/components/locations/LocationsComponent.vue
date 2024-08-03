<template>
  <LoaderSpinner v-if="isLoading" />
  <UpButton />
  <InfiniteScroll :fetchData="fetchData">
    <div class="characters" v-if="locations.length">
      <Location
        v-for="location in locations"
        :location="location"
        :key="location.id"
      /></div
  ></InfiniteScroll>
  <p v-if="!locations.length">Нет результатов.</p>
</template>

<script setup lang="ts">
// import Episode from './EpisodeComponent'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Location from '@/components/locations/LocationComponent.vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import UpButton from '@/components/common/UpButton.vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'

const store = useStore()

const fetchData = () => {
  store.dispatch('locationsModule/fetchLocations')
}

const locations = computed(() => store.state.locationsModule.locations)
const isLoading = computed(() => store.state.locationsModule.isLoading)

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.characters {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
