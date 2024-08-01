<template>
  <router-link :to="`/character/${character.id}`">
    <div class="card">
      <img class="card-img" :src="character.image" alt="" />
      <div class="card_info">
        <p class="name">{{ character.name }}</p>
        <div class="status">
          <div
            class="status-color"
            :style="{ backgroundColor: statusColor }"
          ></div>
          {{ character.status }}
        </div>
      </div>
    </div></router-link
  >
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { I_Character } from '@/store/charactersModule'

const props = defineProps<{
  character: I_Character
}>()

const statusColor = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'green'

    case 'Dead':
      return 'red'
    default:
      return 'gray'
  }
})
</script>

<style scoped>
.card {
  cursor: pointer;
  background-color: var(--black);
  border-radius: 10px;
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid var(--black);
}
.card_info {
  padding: 10px;
  color: var(--white-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  font-size: 16px;
  font-weight: 600;
}

.status {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
