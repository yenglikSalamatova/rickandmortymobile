<template>
  <div>
    <LoaderSpinner v-if="isLoading" />
    <div class="character-info" v-if="!isLoading && episode">
      <div class="rectangle"></div>
      <div class="name">{{ episode.name }}</div>
      <div>Дата выхода: {{ episode.air_date }}</div>
      <div>Эпизод: {{ episode.episode }}</div>
      <div class="name">Персонажи в эпизоде:</div>
      <div class="characters">
        <div v-for="(character, index) in episode.characters" :key="index">
          <CharacterCard :character="character" v-if="character.id" />
          <LoaderSpinner v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import CharacterCard from '../characters/CharacterCard.vue'

const store = useStore()
const route = useRoute()

const id = route.params.id as string

const fetchData = () => {
  store.dispatch('episodesModule/fetchEpisode', id)
}

const episode = computed(() => store.state.episodesModule.episode)
const isLoading = computed(() => store.state.episodesModule.isLoading)

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.character-info {
  position: relative;
  padding: 20px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.character-img img {
  border-radius: 20px;
}

.name {
  font-size: 28px;
  font-weight: 600;
}

.rectangle {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 220px;
  background-color: var(--pink);
  z-index: -1;
}

.characters {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
