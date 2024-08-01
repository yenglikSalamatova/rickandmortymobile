<template>
  <div ref="scrollContainer" class="infinite-scroll">
    <slot></slot>
    <LoaderSpinner v-if="isLoading" />
    <p v-if="!hasMore" class="no-more-results">Больше нет результатов</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'

const props = defineProps({
  fetchData: Function,
  hasMore: Boolean
})

const isLoading = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  const scrollTop = container.scrollTop
  const containerHeight = container.clientHeight
  const scrollHeight = container.scrollHeight

  if (
    scrollHeight - containerHeight - scrollTop <= 0 &&
    props.hasMore &&
    !isLoading.value
  ) {
    isLoading.value = true
    props.fetchData().finally(() => {
      isLoading.value = false
    })
  }
}

onMounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.infinite-scroll {
  position: relative;
}

.no-more-results {
  text-align: center;
  margin: 10px;
}
</style>
