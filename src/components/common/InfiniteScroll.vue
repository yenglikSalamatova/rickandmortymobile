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
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    if (props.fetchData) {
      console.log('fetch scroll')
      props.fetchData()
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    handleScroll()
  }, 500)
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
