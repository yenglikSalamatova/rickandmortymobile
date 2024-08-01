<template>
  <HeaderMain />
  <router-view />
</template>

<script setup lang="ts">
import HeaderMain from './components/layout/HeaderMain.vue'
</script>

<style>
body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--white-bg);
  color: var(--black);
}
</style>
