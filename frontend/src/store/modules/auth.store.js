export const auth = {
  state: {
    user: {
      token: '',
      isAuth: false
    }
  },
  getters: {
    getAuth (state) {
      return state.user.isAuth
    }
  },
  mutations: {

  },
  actions: {

  }

}
