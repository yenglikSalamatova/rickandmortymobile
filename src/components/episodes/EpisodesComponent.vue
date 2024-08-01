<template>
  <LoaderSpinner v-if="isLoading" />
  <UpButton v-if="upScroll" />
  <div class="characters" v-if="characters.length" ref="scrollContainer"></div>
  <p v-if="!characters.length">Нет результатов.</p>
</template>

<script setup lang="ts">
// import Episode from './EpisodeComponent'
import { onMounted, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import { ref } from 'vue'
import UpButton from '@/components/common/UpButton.vue'

const store = useStore()

const fetchCharacters = () => {
  store.dispatch('charactersModule/fetchCharacters')
}

const characters = computed(() => store.state.charactersModule.characters)
const isLoading = computed(() => store.state.charactersModule.isLoading)

const scrollContainer = ref<HTMLElement | null>(null)
const upScroll = ref(false)

const handleScroll = () => {
  const container = scrollContainer.value
  const scrollTop = window.scrollY

  if (
    container &&
    container.getBoundingClientRect().bottom <= window.innerHeight
  ) {
    fetchCharacters()
  }

  upScroll.value = scrollTop > 300
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
}

@media (max-width: 1200px) {
  .characters {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .characters {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .characters {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 400px) {
  .characters {
    grid-template-columns: 1fr;
  }
}
</style>
