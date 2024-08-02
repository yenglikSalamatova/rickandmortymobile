<template>
  <router-link :to="`/episode/${episode.id}`">
    <div class="card">
      <!-- <img class="card-img" :src="episode.image" alt="" /> -->
      <div class="card_info">
        <p class="name">{{ episode.name }}</p>
        <p>{{ episode.episode }}</p>
        <p>{{ episode.air_date }}</p>
      </div>
    </div></router-link
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { I_Episode } from '@/store/episodesModule'

defineProps<{
  episode: I_Episode
}>()
</script>

<style scoped>
.card {
  border: 1px solid transparent;
  cursor: pointer;
  background-color: #121214;
  border-radius: 10px;
  transition: all 0.3s ease;
  width: 100%;
  margin: 0 auto;
}

.card:hover {
  border: 1px solid var(--pink);
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
