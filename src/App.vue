<template>
  <div class="root">
    <HeaderMain />
    <section class="main">
      <LoadingSpinner v-if="isLoading" />
      <router-view v-else />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderMain from './components/layout/HeaderMain.vue'
import LoadingSpinner from '@/components/common/LoaderSpinner.vue'

const isLoading = ref(false)
const router = useRouter()

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  isLoading.value = false
})
</script>

<style>
body {
  font-family: Fira Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--black);
  color: var(--white);
  overflow-x: hidden;
}

.main {
  padding: 0 20px;
  min-height: calc(100vh - 70px);
}
</style>
