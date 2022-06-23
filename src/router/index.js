import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: '/',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (store.state.user.authenticated) {
        // next({name: "Home"})
        next()
      }
      // reject the navigation
      next({ name: "login" })
    },
  
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.authenticated) {
        next({ name: "/" })
      }

      next()
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
