import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import gamepage from '../components/gamepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/game',
    name: 'gamepage',
    component: gamepage
  }
]

const router = new VueRouter({
  routes
})

export default router
