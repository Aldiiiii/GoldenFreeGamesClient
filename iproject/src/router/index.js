import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Collection from '../views/Collection.vue'
import Detail from '../views/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/collections',
      name: 'Collections',
      component: Collection
    },
    {
      path: '/collections/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.access_token
  if (to.name !== 'Login' && !isAuthenticated) {
    if(to.name === 'Register'){
      next()
    }else{
      next({ name: 'Login' })
    }
  }
  else next()
})

export default router
