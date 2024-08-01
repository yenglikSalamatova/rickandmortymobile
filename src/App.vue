<template>
  <div class="root">
    <HeaderMain />
    <section class="main">
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts">
import HeaderMain from './components/layout/HeaderMain.vue'
</script>

<style>
body {
  font-family: Fira Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--black);
  color: var(--white);
}

.main {
  min-height: calc(100vh - 70px);
}
</style>
