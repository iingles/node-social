<template>
  <div>
    <v-content>
      <v-row>
        <v-col class="sm-12 md-3 lg-3">
          <section>
            <!-- Left Column -->
            <h1>Recent Media</h1>
            <div v-for="post in posts" :key="post._id">
              {{ post._id }}
            </div>
          </section>
        </v-col>
        <v-col class="sm-12 md-6 lg-6">
          <!-- Middle column -->
          <v-btn @click="singlePostModal=true">new post</v-btn>
          <template v-if="posts.length > 0">
            <v-sheet class="post" v-for="post in posts" :key="post._id">
              <SinglePost
                :post="post"
                @view="viewPost($event)"
                @delete="deletePost($event)"
              />
            </v-sheet>
          </template>
          <template v-else>
            <h1>You don't have anything in your feed.</h1>
          </template>
        </v-col>
        <v-col class="sm-12 md-3 lg-3">
          <section>
          <!-- Right Column -->
          <h1>Recommended</h1>
          </section>
        </v-col>
      </v-row>
    </v-content>
      <PostModal
        :dialog="this.singlePostModal"
        :fetchedPostData="this.fetchedPostData"
        :editMode="this.editMode"
        :viewMode="this.viewMode"
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

export default {
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
      eventData: {}
    }
  },
  created () {
    let vm = this
    let page = 1
    // For now, grab all posts in database
    fetch(`http://localhost:3000/feed/posts/?page=${page}`)
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
      let method = 'DELETE'
      let url = `http://localhost:3000/feed/post/${postId}`

      fetch(url, {
        method: method
      })
        .then(res => {
          console.log(res)
          location.reload()
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
