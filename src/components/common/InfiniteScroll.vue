<template>
  <div ref="scrollContainer" class="infinite-scroll">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  fetchData: Function
})

const scrollContainer = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  if (container.getBoundingClientRect().bottom <= window.innerHeight) {
    if (props.fetchData) {
      props.fetchData()
    }
  }
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.infinite-scroll {
  position: relative;
  overflow: auto;
}

.no-more-results {
  text-align: center;
  margin: 10px;
}
</style>
