import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Positives from './views/Positives.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/positives',
      name: 'positives',
      component: Positives,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('positives')
  else next()
})

export default router
