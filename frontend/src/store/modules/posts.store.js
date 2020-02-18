import axios from 'axios'
import openSocket from 'socket.io-client'

export const postStore = {
  state: {
    posts: null
  },
  getters: {
    posts (state) {
      return state.posts
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    newPost (state, post) {
      state.posts.unshift(post)
    }
  },
  actions: {
    getAllUserPosts ({ commit }, userId) {
      let page = 1
      const url = `http://localhost:3000/feed/${userId}/posts/?page=${page}`
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
      // Fetch all user posts in database
      axios({
        method: 'get',
        url,
        headers
      })
        .then(res => {
          return res.data
        })
        .then(resData => {
          if (resData.message === 'Not Authenticated') {
            return resData.message
          }
          commit('setPosts', {
            posts: resData.posts
          })
        })
        .catch(err => {
          console.log(err)
        })
      // Set up socket.io
      const socket = openSocket('http://localhost:3000')
      // Use socketio to update posts in real time
      socket.on('posts', data => {
        if (data.action === 'create') {
          commit('newPost', { post: data.post })
        }
      })
    }
  }
}
