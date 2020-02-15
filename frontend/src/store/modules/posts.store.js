export const postStore = {
  state: {
    posts: []
  },
  getters: {
    getAllPosts (state) {
      return state.posts
    },
    getOnePost (state, postId) {
      let postIndex = state.posts.findIndex(p => p._id === postId)
      return state.posts[postIndex]
    }
  },
  mutations: {
    INIT_POSTS (state, posts) {
      state.posts.push(posts)
    },
    CREATE_POST (state, post) {
      state.posts.push(post)
    },
    UPDATE_POST (state, postId, updatedPostData) {
      // Find a post at the given index and update the data
      let postIndex = state.posts.findIndex(p => p._id === postId)
      state.posts[postIndex] = updatedPostData
    },
    DELETE_POST (state, postId) {
      // Find a post at the given index and remove it
      let postIndex = state.posts.findIndex(p => p._id === postId)
      if (postIndex > -1) {
        state.posts.splice(postIndex, 1)
      }
    }
  },
  actions: {

  }
}
