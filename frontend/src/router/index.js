import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Login from '../views/Login'
import Signup from '../views/Signup'
import Profile from '../views/Profile'

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
    component: () => import(/* webpackChunkName: "feed" */ '../views/Feed.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: {
      auth: true
    },
    component: Profile
  },
  {
    path: '/user/:id/follows',
    name: 'follows',
    component: () => import(/* webpackChunkName: "follows" */ '../views/Follows.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "follows" */ '../views/Settings.vue')
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

router.beforeEach((to, from, next) => {
  // Check to see if the route requires the user to be authenticated
  if (to.matched.some(route => route.meta.auth)) {
    // If there is no token, redirect to login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else { next() }
})

export default router
