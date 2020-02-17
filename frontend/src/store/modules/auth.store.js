import axios from 'axios'
import router from '../../router/index'

export const auth = {
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  getters: {
    user (state) {
      return state.user
    },
    token (state) {
      return state.idToken
    }
  },
  mutations: {
    clearAuthData (state, userData) {
      state.idToken = null
      state.userId = null
      state.user = null
    },
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    setUser (state, userData) {
      state.user = userData
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      let vm = this
      // Automatically log the user out when the token expires (right now 1 hour)
      setTimeout(() => {
        vm.dispatch('logout')
      }, expirationTime * 1000)
    },
    signup ({ commit }, authData) {
      axios.put('http://localhost:3000/auth/signup', {
        email: authData.email,
        firstName: authData.firstName,
        lastName: authData.lastName,
        password: authData.password
      }
      )
        .then(res => {
          if (res.status === 422) {
            throw new Error(
              "Validation failed.  Make sure that email address isn't used yet!"
            )
          } else {
            /*
              If successful, redirect to login
            */
            // vm.$router.push('/login')
          }
        }).catch(err => {
          console.log(err)
        })
    },
    storeUser ({ commit, state }, userData) {
      if (!state.idToken) {
        // If there isn't a valid token, just return
        return
      }
      axios({
        method: 'get',
        url: `http://localhost:3000/user/profile/${userData.userId}`,
        headers: {
          'Authorization': `Bearer ${state.idToken}`
        }
      })
        .then(res => {
          commit('setUser', res)
          router.replace('/feed')
        })
        .catch(err => { console.log(err) })
    },
    tryAutoLogin ({ commit }) {
      // Try to automatically log the user in if the token expires

      const token = localStorage.getItem('idToken')

      if (!token) {
        // If there is no token, just return
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const userId = localStorage.getItem('userId')
      const now = new Date()

      // Check to see if now is greater than the expiration date
      if (now >= expirationDate) {
        return
      }
      // If we make it here, then we do have a valid token, so we commit our authUser mutation
      commit('authUser', {
        token,
        userId
      })
    },
    login ({ commit, dispatch }, authData) {
      axios.post('http://localhost:3000/auth/login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          if (res.status === 422) {
            throw new Error('Validation failed.')
          }
          if (res.status !== 200 && res.status !== 201) {
            console.log('Error!')
            throw new Error('Could not authenticate you!')
          }
          return res
        })
        .then(resData => {
          /*
            If successful:
            1. Store the token in Vuex
            2. Set the token in localStorage
            3. Start the logout timer
            4. Redirect to feed
          */

          // Store the token and userId in Vuex
          commit('authUser', {
            token: resData.data.token,
            userId: resData.data.userId
          })

          // Get the user data and store it
          this.dispatch('storeUser', {
            token: resData.data.token,
            userId: resData.data.userId
          })

          /*
             Calculate when the token will expire using the current date/time
             (Just using one hour for now)
          */

          const now = new Date()

          // Measured in milliseconds and converted back to a Date() object
          const expirationDate = new Date(now.getTime() + 3600000)

          // Store the token, expiration date, and userId in the localStorage
          localStorage.setItem('idToken', resData.data.token)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('userId', resData.data.userId)

          // Just set this to 1 hour for now
          dispatch('setLogoutTimer', 3600)

          router.replace('/feed')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('idToken')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userId')
      router.replace('/login')
    }
  }

}
