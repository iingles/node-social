<template>
   <v-container fluid class="ma-0 pa-0">
        <v-row align="center">
            <v-row class="user-banner">
                <v-col
                class="d-flex flex-column justify-center align-center pt-10 pl-10 pr-10"
                >
                  <input
                  type="file"
                  ref="profileImage"
                  style="display: none"
                  accept="image/png, image/jpeg, image/jpg"
                  name="profileImage"
                  @change="updateProfile">
                  <v-img
                  :src="user.profileImageUrl"
                  max-width=200
                  class="d-flex align-end justify-end"
                  >
                  <v-btn
                  icon
                   @click="$refs.profileImage.click()"
                  class="profile-action"
                  v-if="this.$route.params.id === localStorage.userId"
                  ><v-icon>mdi-camera</v-icon>
                  </v-btn>
                  </v-img>
                  <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
                  <v-btn
                    icon
                    v-if="localStorage.userId != this.$route.params.id"
                    @click="updateFollower(localStorage.userId, 'add')"
                    >
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    v-if="localStorage.userId != this.$route.params.id"
                    @click="updateFollower(localStorage.userId, 'delete')"
                    >
                    <v-icon>mdi-account-minus</v-icon>
                  </v-btn>
                </v-col>
                <input
                type="file"
                ref="backgroundImage"
                style="display: none"
                accept="image/png, image/jpeg, image/jpg"
                >
                <v-btn
                 icon
                 @click="$refs.backgroundImage.click()"
                 class="profile-action"
                 v-if="this.$route.params.id === localStorage.userId"
                 ><v-icon>mdi-camera</v-icon>
                 </v-btn>
            </v-row>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" lg="3" class="pa-10">
              <p><router-link :to="`/user/${this.$route.params.id}/follows/`">Following: {{ user.following.length }}</router-link></p>
              <p><router-link :to="`/user/${this.$route.params.id}/follows/`">Followers:  {{ user.followers.length }}</router-link></p>
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
            <v-col cols="12" xs="12" lg="5" class="pa-10">
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
            <v-spacer></v-spacer>
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
        backgroundImageUrl: '',
        profileImageUrl: '',
        followers: [],
        following: [],
        posts: []
      },
      selectedFile: null,
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
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    updateProfile (evt) {
      let userId = this.$route.params.id
      let url = `http://localhost:3000/user/profile/update/${userId}`
      let method = 'PUT'
      let vm = this

      vm.selectedFile = evt.target.files[0]

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.token}`
        },
        body: JSON.stringify({
          firstName: vm.firstName,
          lastName: vm.lastName,
          phone: vm.phone,
          status: vm.status,
          bio: vm.bio,
          backgroundImageUrl: vm.backgroundImageUrl,
          profileImageUrl: vm.selectedFile
        })
      })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateFollower (userId, opt) {
      const followerId = this.$route.params.id
      const url = `http://localhost:3000/user/profile/updateFollowers`
      let vm = this
      let method = 'PATCH'

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vm.token}`
        },
        body: JSON.stringify({
          userId: userId,
          followerId: followerId,
          opt: opt
        })
      })
        .then(res => {
          return res.json()
        })
        .catch(err => {
          console.log(`${err} failure`)
        })
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
