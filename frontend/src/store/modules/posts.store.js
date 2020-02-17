import axios from 'axios'
import openSocket from 'socket.io-client'

export const postStore = {
  state: {
    posts: []
  },
  getters: {

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
    fetchAllPosts ({ commit }, postData) {
      let page = 1
      // Fetch all posts in database
      axios.get(`http://localhost:3000/feed/posts/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.idToken}`,
          userId: `User ${this.$store.state.userId}`
        }
      })
        .then(res => {
          return res.json()
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
