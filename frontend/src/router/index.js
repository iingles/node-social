import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Login from '../views/Login'
import Signup from '../views/Signup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "feed" */ '../views/Feed.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/feed',
    name: 'feed',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "feed" */ '../views/Feed.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      auth: false
    },
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      auth: false
    },
    component: Login
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// if (localStorage.getItem('token')) {
//   const authToken = JSON.parse(localStorage.getItem('token'))
//   this.$store.dispatch('authUser', true)
//   this.$store.dispatch('passToken', authToken)
// } else {
//   this.$store.dispatch('authUser', false)
// }

// router.beforeEach((to, from, next) => {
//   // Check to see if the route requires the user to be authenticated
//   if (to.matched.some(route => route.meta.auth)) {
//     // If there is no token, redirect to login
//     if (localStorage.getItem('jwt') == null) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       // let user = JSON.parse(localStorage.getItem('user'))
//       router.push('/feed')
//     }
//   } else { next() }
// })

export default router
