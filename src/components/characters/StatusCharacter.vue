<template>
  <div class="status">
    <div class="status-color" :style="{ backgroundColor: statusColor }"></div>
    {{ status }}
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  status: String
})

const statusColor = computed(() => {
  switch (props.status) {
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
.status {
  color: var(--white);
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
