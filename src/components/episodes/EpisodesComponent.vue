<template>
  <LoaderSpinner v-if="isLoading" />
  <UpButton />
  <InfiniteScroll :fetchData="fetchEpisodes">
    <div class="characters" v-if="episodes.length">
      <Episode
        v-for="episode in episodes"
        :episode="episode"
        :key="episode.id"
      /></div
  ></InfiniteScroll>
  <p v-if="!episodes.length">Нет результатов.</p>
</template>

<script setup lang="ts">
// import Episode from './EpisodeComponent'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import Episode from './EpisodeComponent.vue'
import UpButton from '@/components/common/UpButton.vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'

const store = useStore()

const fetchEpisodes = () => {
  store.dispatch('episodesModule/fetchEpisodes')
}

const episodes = computed(() => store.state.episodesModule.episodes)
const isLoading = computed(() => store.state.episodesModule.isLoading)

onMounted(() => {
  fetchEpisodes()
})
</script>

<style scoped>
.characters {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
