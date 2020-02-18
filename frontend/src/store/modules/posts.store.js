import axios from 'axios'
import openSocket from 'socket.io-client'

export const postStore = {
  state: {
    posts: null
  },
  getters: {
    posts (state) {
      return state.posts
    },
    post (state, postId) {
      const post = state.posts.includes(postId)
      return post
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
      let method = 'get'
      let url = `http://localhost:3000/feed/${userId}/posts/?page=${page}`
      let headers = {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
      // Fetch all user posts in database
      axios({
        method,
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
    },
    // Save a post to the database
    savePost ({ commit }, postData) {
      let url = 'http://localhost:3000/feed/posts'
      let method = 'POST'
      let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }

      axios({
        method,
        url,
        headers,
        data: {
          title: postData.title,
          content: postData.content,
          creator: postData.creator
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating or Editing a post failed!')
          }

          return res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
