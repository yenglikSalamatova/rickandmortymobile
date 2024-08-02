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
            stroke="var(--white)"
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
            fill="var(--white)"
          />
        </svg>
      </div>
      <transition name="fade">
        <nav class="header__nav" v-if="menuOpened">
          <router-link to="/" class="link">{{
            $t('characters.title')
          }}</router-link>
          <router-link to="/episodes" class="link">{{
            $t('episodes.title')
          }}</router-link>
          <router-link to="/locations" class="link">{{
            $t('locations.title')
          }}</router-link>
          <a
            href="https://github.com/yenglikSalamatova"
            target="_blank"
            class="link"
            >{{ $t('myGithub') }}</a
          >
        </nav>
      </transition>
    </div>

    <nav class="header__nav-desktop">
      <router-link to="/" class="link">{{
        $t('characters.title')
      }}</router-link>
      <router-link to="/episodes" class="link">{{
        $t('episodes.title')
      }}</router-link>
      <router-link to="/locations" class="link">{{
        $t('locations.title')
      }}</router-link>
      <a
        href="https://github.com/yenglikSalamatova"
        target="_blank"
        class="link"
        >{{ $t('myGithub') }}</a
      >
      <div class="btns">
        <button class="btn" @click="changeLanguage('ru')">
          <img
            class="icon-img"
            src="https://images.emojiterra.com/twitter/v13.1/512px/1f1f7-1f1fa.png"
            alt=""
          />
          RU
        </button>
        <button class="btn" @click="changeLanguage('en')">
          <img
            class="icon-img"
            src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f1ec-1f1e7.png"
            alt=""
          />
          EN
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/common/LogoMain.vue'
import { useI18n } from 'vue-i18n'

const menuOpened = ref(false)

const { locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang
}

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
  background-color: var(--black);
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.header__nav-desktop {
  display: none;
  position: static;
  background-color: var(--black);
  padding: 0;
  display: flex;
  align-items: center;
  gap: 20px;
}

.link {
  font-size: 22px;
  color: var(--white);
  padding: 20px;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid var(--gray);
  transition: all 0.3s ease;
}

.link:hover {
  color: var(--pink);
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

.btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 1024px) {
  .header__menu {
    display: none;
  }

  .header__nav {
    display: none;
  }

  .header__nav-desktop {
    display: flex;
  }

  .link {
    border-bottom: none;
    padding: 0;
    margin-left: 20px;
  }
}

@media (max-width: 1024px) {
  .header__menu {
    display: block;
  }

  .header__nav {
    display: flex;
  }

  .header__nav-desktop {
    display: none;
  }
}
</style>
