<template>
  <LoaderSpinner v-if="isLoading" />
  <div class="characters" v-if="characters.length" ref="scrollContainer">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
  <p v-else>Нет результатов.</p>
</template>

<script setup lang="ts">
import CharacterCard from './CharacterCard.vue'
import { onMounted, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import { ref } from 'vue'

const store = useStore()

const fetchCharacters = () => {
  store.dispatch('charactersModule/fetchCharacters')
}

const characters = computed(() => store.state.charactersModule.characters)
const isLoading = computed(() => store.state.charactersModule.isLoading)

const scrollContainer = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const container = scrollContainer.value
  if (
    container &&
    container.getBoundingClientRect().bottom < window.innerHeight
  ) {
    fetchCharacters()
  }
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
  fetchCharacters()
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.characters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
