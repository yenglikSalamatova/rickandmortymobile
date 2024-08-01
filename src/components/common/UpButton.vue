<template>
  <svg
    v-if="isVisible"
    @click="scrollToTop"
    fill="#000000"
    width="45px"
    height="45px"
    viewBox="0 0 24 24"
    id="up-square"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    class="icon flat-color"
  >
    <rect
      id="primary"
      x="2"
      y="2"
      width="20"
      height="20"
      rx="3"
      style="fill: var(--white); stroke: var(--green)"
    ></rect>
    <path
      id="secondary"
      d="M16,15a1,1,0,0,1-.78-.38L12,10.6l-3.22,4a1,1,0,1,1-1.56-1.24l4-5a1,1,0,0,1,1.56,0l4,5a1,1,0,0,1-.16,1.4A1,1,0,0,1,16,15Z"
      style="fill: var(--green)"
    ></path>
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  const scrollTop = window.scrollY
  isVisible.value = scrollTop > 300
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style setup>
.icon {
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 0;
  z-index: 900;
}
</style>
