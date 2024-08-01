<template>
  <header class="header">
    <Logo />
    <div class="header__menu" @click="handleOpen">
      <div class="menu__icon" v-show="!menuOpened">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="menu-close__icon" v-show="menuOpened">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#0F1729"
          />
        </svg>
      </div>
      <transition name="fade">
        <nav class="header__nav" v-if="menuOpened">
          <router-link to="/" class="link">Персонажи</router-link>
          <router-link to="/episodes" class="link">Эпизоды</router-link>
          <router-link to="/locations" class="link">Локации</router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/common/LogoMain.vue'

const menuOpened = ref(false)

const handleOpen = () => {
  menuOpened.value = !menuOpened.value
}
</script>

<style scoped>
.header {
  position: relative;
  height: 70px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__icon,
.menu-close__icon {
  cursor: pointer;
}

.header__nav {
  position: fixed;
  z-index: 1000;
  background-color: var(--white-bg);
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.link {
  font-size: 22px;
  color: var(--black);
  padding: 20px;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid var(--gray);
  transition: all 0.3s ease;
}

.link:hover {
  color: var(--orange);
}

.link.router-link-active {
  color: var(--green);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
