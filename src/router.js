import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/Main',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/Deposit',
      name: 'deposit',
      component: () => import(/* webpackChunkName: "deposit" */ './views/Deposit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Transfer',
      name: 'transfer',
      component: () => import(/* webpackChunkName: "transfer" */ './views/Transfer.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "withdraw" */ './views/Withdraw.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else next()
})
export default router
