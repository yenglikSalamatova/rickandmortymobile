<template>
  <UpButton />
  <InfiniteScroll :fetchData="fetchCharacters" :isLoading="isLoading">
    <div class="characters" v-if="characters.length">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </InfiniteScroll>

  <LoaderSpinner v-if="isLoading" />
  <p v-if="!characters.length">Нет результатов.</p>
</template>

<script setup lang="ts">
import CharacterCard from './CharacterCard.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import UpButton from '@/components/common/UpButton.vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'
import { onMounted } from 'vue'

const store = useStore()

const fetchCharacters = () => {
  store.dispatch('charactersModule/fetchCharacters')
}

const characters = computed(() => store.state.charactersModule.characters)
const isLoading = computed(() => store.state.charactersModule.isLoading)

onMounted(() => fetchCharacters())
</script>

<style scoped>
.characters {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
