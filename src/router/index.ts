import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

function lazyLoad (view:string) {
  return () => import(`@/views/${view}.vue`)
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad('HomeView')
  },
  {
    path: '/episodes',
    name: 'episodes',
    component: lazyLoad('EpisodesView')
  },
  {
    path: '/locations',
    name: 'locations',
    component: lazyLoad('LocationsView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
