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
      console.log(userData)
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
          console.log(res)
          commit('setUser', res)
          router.replace('/feed')
        })
        .catch(err => { console.log(err) })
    },
    login ({ commit }, authData) {
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
            If successful, store the token in Vuex and redirect to feed
          */
          commit('authUser', {
            token: resData.data.token,
            userId: resData.data.userId
          })
          // Get the user data and store it
          this.dispatch('storeUser', {
            token: resData.data.token,
            userId: resData.data.userId
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      router.replace('/login')
    }
  }

}
