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
  const element = scrollContainer.value

  if (element && element.getBoundingClientRect().bottom <= window.innerHeight) {
    if (props.fetchData) {
      props.fetchData()
    }
  }
}

onMounted(() => {
  // Вызывать скролл, если вдруг все элементы умешаются
  setTimeout(() => {
    handleScroll()
  }, 500)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
