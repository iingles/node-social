<template>
   <v-container>
        <v-row align="center">
            <v-row class="user-banner">
                <v-col class="d-flex flex-column justify-center align-center">
                  <v-img
                  :src="user.profileImageUrl"
                  max-width=200
                  class="d-flex align-end justify-end"
                  ><div class="profile-action"><v-icon>mdi-camera</v-icon></div></v-img>
                  <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
                </v-col>
                <div class="profile-action"><v-icon>mdi-camera</v-icon></div>
            </v-row>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" lg="4">
              <p>Following: {{ user.following.length }}</p>
              <p>Followers: {{ user.followers.length }}</p>
              <h1>Status: </h1>
              {{ user.status }}
              <div class="profile-action"><v-icon>mdi-pencil</v-icon></div>
              <h2>Bio</h2>
              {{ user.bio }}
              <div class="profile-action"><v-icon>mdi-pencil</v-icon></div>
            </v-col>
            <v-col cols="12" xs="12" lg="8">
              Feed
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
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
        following: []
      }
    }
  },
  created () {
    let vm = this

    fetch(`http://localhost:3000/user/profile/${localStorage.getItem('userId')}`, {
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
  }
}
</script>

<style scoped>
  .user-banner {
    background: #f1f1f1;
  }
</style>
