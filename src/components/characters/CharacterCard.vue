<template>
  <router-link :to="`/character/${character.id}`">
    <div class="card">
      <img class="card-img" :src="character.image" alt="" />
      <div class="card_info">
        <p class="name">{{ character.name }}</p>
        <StatusCharacter :status="character.status" />
      </div></div
  ></router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { I_Character } from '@/store/charactersModule'
import StatusCharacter from './StatusCharacter.vue'

defineProps<{
  character: I_Character
}>()
</script>

<style scoped>
.card {
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: #121214;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.card:hover {
  border: 1px solid var(--pink);
}

.card-img {
  width: 100%;
  height: 250px;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid var(--black);
}
.card_info {
  padding: 15px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  max-width: 200px;
  font-size: 20px;
  font-weight: 600;
}
</style>
