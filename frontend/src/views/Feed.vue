<template>
    <section>
      <template v-if="this.posts.length > 0">
        <v-sheet class="post" v-for="post in posts" :key="post._id">
          <h1>{{ post.title }}</h1>
          <h2>{{ post.creator.name }}</h2>
          <p>{{ post.content }}</p>
        </v-sheet>
      </template>
      <template v-else>
        <h1>You don't have anything in your feed!</h1>
      </template>
    </section>
</template>

<script>
export default {
  data: () => {
    return {
      posts: []
    }
  },
  created () {
    let vm = this

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
  }
}
</script>

<style scoped>
  .post {
    padding: 1rem;
  }
</style>
