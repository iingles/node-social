import Vue from 'vue'
import Vuex from 'vuex'
import { postStore } from './modules/posts.store'
import { auth } from './modules/auth.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    postStore
  }
})
