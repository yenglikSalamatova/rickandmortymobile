import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/reset.css'
import i18n from './i18n/i18n'

createApp(App).use(store).use(router).use(i18n).mount('#app')
