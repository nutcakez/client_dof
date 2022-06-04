import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import gamepage from '../components/gamepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/game',
    name: 'gamepage',
    component: () => import('../components/gamepage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
