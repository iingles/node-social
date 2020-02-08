import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userState: user.state.user
  },
  getters: {
    userLogin: user.getters.userLoggedIn,
    userFirstName: user.getters.userName
  },
  mutations: {
    changeLogin: user.mutations.changeLoggedInStatus,
    storeUser: user.mutations.storeUser
  },
  actions: {
    userLogin: user.actions.userLoggedIn,
    userLogout: user.actions.userLoggedOut

  },
  modules: {
    user
  }
})
