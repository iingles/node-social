<template>
    <div>
      <header class="post-header d-flex align-start">
        <v-img :src="post.creator.profileImageUrl" max-width=50></v-img>
        <router-link class="post-creator" :to="`/profile/${post.creator._id}`">{{ post.creator.firstName }} {{ post.creator.lastName }}</router-link>
        <span class="time-date">{{ postTime }}&nbsp;{{ postDate }}</span>
      </header>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div class="post-actions d-flex align-end justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon  v-on="on">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </template>
          <span>Like</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon  v-on="on">
              <v-icon>mdi-message-outline</v-icon>
            </v-btn>
          </template>
          <span>Comment</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon  v-on="on">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Share</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon  v-on="on">
              <v-icon>mdi-code-tags</v-icon>
            </v-btn>
          </template>
          <span>Embed</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn icon @click="()=>{this.$emit('view', post._id)}"><v-icon>mdi-card-search-outline</v-icon></v-btn>
        <DeletePost
          :token="token"
          :postId="post._id"
          :authUser="authUser"
          :creatorId="post.creator._id"
        />
        <!-- <v-btn
        icon
         @click="()=>{this.$emit('delete', post._id)}"
         v-if="post.creator._id === authUser"
         ><v-icon>mdi-delete</v-icon></v-btn> -->
      </div>
    </div>
</template>

<script>
import DeletePost from './post-actions/DeletePost'

export default {
  components: {
    DeletePost
  },
  props: {
    post: Object,
    authUser: String,
    token: String
  },
  data: () => {
    return {
      postTime: '',
      postDate: ''
    }
  },
  created () {
    let vm = this
    // let postTD = vm.post.createdAt.split('T')

    vm.postTime = vm.post.createdAt.substring(
      vm.post.createdAt.lastIndexOf('T') + 1,
      vm.post.createdAt.lastIndexOf('.'))

    vm.postDate = vm.post.createdAt.split('T')[0]
  }
}
</script>

<style scoped>
  .post-header {
    margin-bottom: .5rem;
  }

  .time-date {
    margin-left: auto;
    font-style: italic;
    font-size: 1.2rem;
    color: #999;
  }

  .post-creator {
    margin: 0 1rem;
    color: #000;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.6rem;
    cursor: pointer;
  }

  .post-content {
    padding: 1rem 0;
    font-size: 1.5rem;
  }

  .post-actions {
    border-top: .1rem solid #ccc;
  }
</style>
