<template>
   <v-container fluid>
        <v-row align="center">
            <v-spacer></v-spacer>
            <v-col class="sm-12 lg-3">
                <!-- left column -->
                <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
            <v-img
            :src="user.profileImageUrl"
            max-width=200
            >
            </v-img>
            <h1>Status: </h1>
            {{ user.status }}
            <h2>Bio</h2>
            {{ user.bio }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="sm-12 lg-9">
                <!-- Right column -->
               <p>Following: {{ user.following.length }}</p>
               <p>Followers: {{ user.followers.length }}</p>
            </v-col>
            <v-spacer></v-spacer>
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

</style>
