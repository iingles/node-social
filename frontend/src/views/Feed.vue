<template>
  <div>
    <v-content>
      <v-spacer></v-spacer>
      <v-row class="d-flex justify-center">
        <v-col cols="12" xs="12" sm="12" md="3" lg="2" class="order-xs-3 order-sm-3 order-md-2 order-lg-1">
          <section>
            <!-- Left Column -->
            <h1>Recent Media</h1>
            <template v-if="posts.length != 0">
              <div v-for="post in posts" :key="post._id">
                {{ post._id }}
              </div>
            </template>
            <template v-else>
              <h1>Nothing to show.</h1>
            </template>
           </section>
        </v-col>
        <v-col cols="12" xs="12" md="7" sm="12" lg="5" class="order-xs-1 order-sm-1 order-md-1 order-lg-2">
          <!-- Middle column -->
          <v-btn @click="singlePostModal=true, newPost=true">new post</v-btn>
          <template v-if="posts">
            <v-card
            class="post"
            outlined
            tile
            ripple
            v-for="post in posts"
            :key="post._id">
              <SinglePost
                :authUser="authUser"
                :post="post"
                :token="token"
                @view="viewPost($event)"
                @delete="deletePost($event)"
              />
            </v-card>
          </template>
          <template v-else>
            <h1>You don't have anything in your feed.</h1>
          </template>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="order-xs-2 order-sm-2 order-md-2 order-lg-3">
          <section>
          <!-- Right Column -->
          <h1>Recommended</h1>
          </section>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
    </v-content>
      <PostModal
        :dialog="this.singlePostModal"
        :fetchedPostData="this.fetchedPostData"
        :editMode="this.editMode"
        :viewMode="this.viewMode"
        :newPost="this.newPost"
        :authUser="this.authUser"
        @accept="savePost($event)"
        @edit="editMode=true; viewMode=false"
        @editedPost="updatePost($event)"
        @cancel="cancelModal()"
      />
    </div>
</template>

<script>
import PostModal from '../components/posts/PostModal'
import SinglePost from '../components/posts/SinglePost'
import openSocket from 'socket.io-client'

export default {
  props: {
    token: String,
    authUser: String
  },
  components: {
    SinglePost,
    PostModal
  },
  data: () => {
    return {
      posts: [],
      singlePostModal: false,
      fetchedPostData: {},
      editMode: false,
      viewMode: false,
      newPost: false,
      eventData: {}
    }
  },
  created () {
    let vm = this
    let page = 1
    // For now, grab all posts in database
    fetch(`http://localhost:3000/feed/posts/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${vm.token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(resData => {
        if (resData.message === 'Not Authenticated') {
          return resData.message
        }
        vm.posts = resData.posts
      })
      .catch(err => {
        console.log(err)
      })
    // Set up socket.io
    const socket = openSocket('http://localhost:3000')
    socket.on('posts', data => {
      if (data.action === 'create') {
        vm.posts.unshift(data.post)
      }
    })
  },
  methods: {
    addPost (data) {
      let vm = this
      const updatedPosts = [...vm.posts]
      return { posts: updatedPosts }
    },
    // Save a post to the database
    savePost (postData) {
      let vm = this
      let url = 'http://localhost:3000/feed/posts'
      let method = 'POST'
      vm.singlePostModal = false
      vm.newPost = false

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.token}`
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          creator: postData.creator
        })

      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating or Editing a post failed!')
          }
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // View a single post
    viewPost (postId) {
      let vm = this
      let url = `http://localhost:3000/feed/post/${postId}`

      fetch(url, {
        headers: {
          Authorization: `Bearer ${vm.token}`
        }
      })
        .then(res => {
          return res.json()
        })
        .then(resData => {
          vm.fetchedPostData = resData
          vm.singlePostModal = true
          vm.viewMode = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatePost (postData) {
      let url = `http://localhost:3000/feed/post/${postData._id}`
      let method = 'PUT'
      let vm = this
      vm.editMode = false

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.token}`
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          creator: postData.creator
        })
      })
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(err + 'failure')
        })

      const socket = openSocket('http://localhost:3000')
      socket.on('posts', data => {
        if (data.action === 'update') {
          const updatedPostIndex = vm.posts.findIndex(p => p._id === postData._id)
          if (updatedPostIndex > -1) {
            vm.posts[updatedPostIndex].content = postData.content
          }
        }
      })
      vm.singlePostModal = false
    },
    deletePost (postId) {
      let vm = this
      let method = 'DELETE'
      let url = `http://localhost:3000/feed/post/${postId}`

      fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${vm.token}`
        }
      })
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })
      const socket = openSocket('http://localhost:3000')
      socket.on('posts', data => {
        if (data.action === 'delete') {
          const updatedPostIndex = vm.posts.findIndex(p => p._id === postId)
          if (updatedPostIndex > -1) {
            vm.posts.splice(updatedPostIndex, 1)
          }
        }
      })
    },
    cancelModal () {
      // If the modal window is closed, reset everything
      let vm = this
      vm.editMode = false
      vm.viewMode = false
      vm.newPost = false
      vm.fetchedPostData = {}
      vm.singlePostModal = false
    }
  }
}
</script>

<style scoped>
  .post {
    padding: 1rem;
  }
</style>
