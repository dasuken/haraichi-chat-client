import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RadioDetail from '@/views/RadioDetail'
import Store from '../store/index'

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

router.beforeEach((to, from, next) => {
  if (!Store.getters['userId']) Store.commit('publishUserId')
  next()
})

export default router
