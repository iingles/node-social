<template>
   <v-container>
        <v-row align="center">
            <v-row class="user-banner">
                <v-col class="d-flex flex-column justify-center align-center">
                  <v-img
                  :src="user.profileImageUrl"
                  max-width=200
                  class="d-flex align-end justify-end"
                  >
                  <v-btn
                  icon
                  @click="updateProfile('profile-picture')"
                  class="profile-action"
                  v-if="this.$route.params.id === localStorage.userId"
                  ><v-icon>mdi-camera</v-icon>
                  </v-btn>
                  </v-img>
                  <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
                  <v-btn v-if="localStorage.userId != this.$route.params.id">Follow</v-btn>
                </v-col>
                <v-btn
                 icon
                 @click="updateProfile('background-picture')"
                 class="profile-action"
                 v-if="this.$route.params.id === localStorage.userId"
                 ><v-icon>mdi-camera</v-icon>
                 </v-btn>
            </v-row>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" lg="4">
              <p>Following: {{ user.following.length }}</p>
              <p>Followers: {{ user.followers.length }}</p>
              <h1>Status: </h1>
              {{ user.status }}
              <v-btn
               icon
               @click="updateProfile('status')"
               class="profile-action"
               v-if="this.$route.params.id === localStorage.userId"
               ><v-icon>mdi-pencil</v-icon>
               </v-btn>
              <h2>Bio</h2>
              {{ user.bio }}
              <v-btn
              icon
              @click="updateProfile('bio')"
              class="profile-action"
              v-if="this.$route.params.id === localStorage.userId"
              ><v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" xs="12" lg="8">
              <h1>Posts</h1>
              <v-card
                class="post"
                v-for="post in user.posts"
                :key="post._id"
                outlined
                tile
                ripple
              >
              <SinglePost
                :post="post"
              />
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SinglePost from '../components/posts/SinglePost'

export default {
  components: {
    SinglePost
  },
  props: {
    token: String
  },
  data: () => {
    return {
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        status: '',
        bio: '',
        profileImageUrl: '',
        followers: [],
        following: [],
        posts: []
      },
      localStorage
    }
  },
  created () {
    let vm = this

    let userId = this.$route.params.id

    fetch(`http://localhost:3000/user/profile/${userId}`, {
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
        vm.user = resData
        vm.user.posts.sort({ createdAt: -1 })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    updateProfile (proSection) {
      console.log(proSection)
    }
  }
}
</script>

<style scoped>
  .post {
    padding: 1rem;
  }
  .user-banner {
    background: #f1f1f1;
  }
</style>
