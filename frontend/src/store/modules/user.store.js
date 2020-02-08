// Module for the "user" state store
import router from '../../router'

export const state = {
  user: {
    firstName: 'hi',
    lastName: '',
    email: '',
    loggedIn: false
  }
}

export const getters = {
  userLoggedIn (state) {
    return state.user.loggedIn
  },
  userName (state) {
    return state.user.firstName
  }
}

export const mutations = {
  storeUser (state, user) {
    state.user = user
    return state.user
  },
  changeLoggedInStatus (state, user) {
    state.user.email = user.userName
    state.user.password = user.password
    state.user.loggedIn = user.loggedIn
    return state.user
  }
}

export const actions = {
  userLoggedIn ({ commit }, user) {
    commit('storeUser', user)
    // change the user's login status
    commit('changeLoggedInStatus', user)
    // route to main app
    router.replace('/').catch(() => { /* catching duplicate route error */ })
  },
  userLoggedOut ({ commit }, user) {
    commit('changeLoggedInStatus', user)
    // route back to login screen
    router.replace('/login').catch(() => { /* catching duplicate route error */ })
  }
}
