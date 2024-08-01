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
  cursor: pointer;
  background-color: #121214;
  border-radius: 10px;
  transition: transform 0.3s ease;
  max-width: 300px;
  margin: 0 auto;
}

.card:hover {
  transform: scale(1.05);
}

.card-img {
  width: 100%;
  height: 200px;
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
  font-size: 20px;
  font-weight: 600;
}
</style>
