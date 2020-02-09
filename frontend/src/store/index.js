import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      firstName: '',
      lastName: '',
      token: '',
      auth: false,
      status: ''
    }
  },
  getters: {
    getAuth (state) {
      return state.user.auth
    }
  },
  mutations: {
    userAuth (state) {
      state.user.auth = state
      return state.user.auth
    },
    storeToken (state) {
      state.user.token = localStorage.getItem.token
    }
  },
  actions: {
    authUser ({ commit }, auth) {
      commit('userAuth', auth)
    },
    passToken ({ commit }, token) {
      commit('storeToken', token)
    }
  }
})
