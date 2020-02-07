<template>
    <section>
      <template v-if="this.posts.length > 0">
        <v-sheet class="post" v-for="post in posts" :key="post._id">
          <h1>{{ post.title }}</h1>
          <h2>{{ post.creator.name }}</h2>
          <p>{{ post.content }}</p>
          <v-btn @click="viewPost(post._id)">view</v-btn>
          <v-btn @click="deletePost(post._id)">delete</v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-sheet>
      </template>
      <template v-else>
        <h1>You don't have anything in your feed!</h1>
      </template>
      <SinglePost
        :dialog="this.singlePostModal"
        :fetchedPostData="this.fetchedPostData"
        :editMode="this.editMode"
        :viewMode="this.viewMode"
        @accept="savePost($event)"
        @edit="editMode=true; viewMode=false"
        @editedPost="updatePost($event)"
        @cancel="cancelModal()"
      />
      <v-btn @click="singlePostModal=true">new post</v-btn>
    </section>
</template>

<script>
import SinglePost from '../components/SinglePost'

export default {
  components: {
    SinglePost
  },
  data: () => {
    return {
      storedData: {},
      posts: [],
      singlePostModal: false,
      fetchedPostData: {},
      editMode: false,
      viewMode: false,
      eventData: {}
    }
  },
  created () {
    let vm = this
    // For now, grab all posts in database
    fetch('http://localhost:3000/feed/posts')
      .then(res => {
        return res.json()
      })
      .then(resData => {
        vm.posts = resData.posts
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // Save a post to the database
    savePost (postData) {
      let vm = this
      let url = 'http://localhost:3000/feed/posts'
      let method = 'POST'

      vm.singlePostModal = false

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
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
        .then(resData => {

        })
        .catch(err => {
          console.log(err)
        })
    },
    // View a single post
    viewPost (postId) {
      let vm = this
      let url = `http://localhost:3000/feed/post/${postId}`

      fetch(url)
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

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
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
      vm.singlePostModal = false
    },
    deletePost (postId) {
      let method = 'POST'
      let url = `http://localhost:3000/feed/deletePost/${postId}`

      fetch(url, {
        method
      })
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelModal () {
      // If the modal window is closed, reset everything
      let vm = this
      vm.singlePostModal = false
      vm.editMode = false
      vm.viewMode = false
      vm.fetchedPostData = {}
    }
  }
}
</script>

<style scoped>
  .post {
    padding: 1rem;
  }
</style>
