<template>
  <LoaderSpinner v-if="isLoading" />
  <div class="character-info" v-if="!isLoading && character">
    <div class="character-img">
      <img :src="character.image" :alt="character.name" />
      <div class="rectangle"></div>
    </div>
    <div class="name">{{ character.name }}</div>
    <StatusCharacter :status="character.status" />
    <div>Тип: {{ character.species }}</div>
    <div>Пол: {{ character.gender }}</div>
    <div>Локация: {{ character.location?.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import StatusCharacter from '@/components/characters/StatusCharacter.vue'

const store = useStore()
const route = useRoute()

const characterId = route.params.id as string

const fetchCharacter = () => {
  store.dispatch('charactersModule/fetchCharacterById', characterId)
  document.title = `${character.value.name} | Веб приложение Рик и Морти`
}

const character = computed(() => store.state.charactersModule.character)
const isLoading = computed(() => store.state.charactersModule.isLoading)

onMounted(() => {
  fetchCharacter()
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
  font-size: 25px;
  font-weight: 600;
}

.rectangle {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 220px;
  background-color: var(--green);
  z-index: -1;
}
</style>
