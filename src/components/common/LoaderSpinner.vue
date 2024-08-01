<template>
  <div class="loader-wrapper"><div class="loader"></div></div>
</template>

<script lang="ts">
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>
.loader-wrapper {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 20px;
  aspect-ratio: 1;
  background: var(--green);
  box-shadow: 0 0 60px 15px var(--green);
  transform: translate(-80px);
  clip-path: inset(0);
  animation: l4-1 0.5s ease-in-out infinite alternate,
    l4-2 1s ease-in-out infinite;
}

@keyframes l4-1 {
  100% {
    transform: translateX(80px);
  }
}

@keyframes l4-2 {
  33% {
    clip-path: inset(0 0 0 -100px);
  }

  50% {
    clip-path: inset(0 0 0 0);
  }

  83% {
    clip-path: inset(0 -100px 0 0);
  }
}
</style>
