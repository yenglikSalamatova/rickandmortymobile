<template>
  <div class="home">
    <div class="home_about">
      <h1 class="h1">Персонажи</h1>
      <div class="results-info">{{ charactersCount }} результатов</div>
    </div>
    <CharactersCards />
  </div>
</template>

<script setup lang="ts">
import CharactersCards from '@/components/characters/CharactersCards.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const charactersCount = computed(() => store.state.charactersModule.totalCount)
</script>

<style scoped>
.home_about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.h1 {
}
</style>
