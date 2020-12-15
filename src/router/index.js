import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RadioDetail from '@/views/RadioDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/radio/:id',
    component: RadioDetail,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
