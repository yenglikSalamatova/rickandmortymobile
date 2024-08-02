<template>
  <div>
    <LoaderSpinner v-if="isLoading" />
    <div class="character-info" v-if="!isLoading && location">
      <div class="rectangle"></div>
      <div class="name">{{ location.name }}</div>
      <div>{{ $t('locations.type') }}: {{ location.type }}</div>
      <div>{{ $t('locations.dimension') }}: {{ location.dimension }}</div>
      <div class="name">{{ $t('locations.characters') }}:</div>
      <div class="characters">
        <div v-for="(character, index) in location.residents" :key="index">
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
  store.dispatch('locationsModule/fetchLocation', id)
}

const location = computed(() => store.state.locationsModule.location)
const isLoading = computed(() => store.state.locationsModule.isLoading)

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
  background-color: var(--blue);
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
