<template>
    <section>
      <template v-if="this.posts.length > 0">
        <v-sheet class="post" v-for="post in posts" :key="post._id">
          <h1>{{ post.title }}</h1>
          <h2>{{ post.creator.name }}</h2>
          <p>{{ post.content }}</p>
          <v-btn @click="viewPost(post._id)">view</v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-sheet>
        {{ post }}
      </template>
      <template v-else>
        <h1>You don't have anything in your feed!</h1>
      </template>
      <NewPost
        :dialog="this.newPostModal"
        @accept="savePost($event)"
        @cancel="newPostModal=false"
      />
      <v-btn @click="newPostModal=true">new post</v-btn>
    </section>
</template>

<script>
import NewPost from '../components/NewPost'

export default {
  components: {
    NewPost
  },
  data: () => {
    return {
      posts: [],
      post: {},
      newPostModal: false,
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

      vm.dialog = false

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
      // let vm = this
      let url = `http://localhost:3000/feed/post/${postId}`

      fetch(url)
        .then(result => {
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .post {
    padding: 1rem;
  }
</style>
