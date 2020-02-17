<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" xs="12" lg="6">
                 <v-tabs class="tabs">
                    <v-tab key="Followers">Followers</v-tab>
                    <v-tab key="Following">Following</v-tab>
                    <v-tab-item key="Followers">
                        <template v-if="followers !== 'undefined' || followers.length !== 0">
                            <v-card
                            :to="`/profile/${a._id}`"
                            v-for="a in followers" :key="a._id"
                            tile
                            outlined
                            >
                              <v-card-text>
                                <v-img max-width=40 :src="a.profileImageUrl"></v-img>
                                {{ a.firstName + ' ' + a.lastName }}
                              </v-card-text>
                            </v-card>
                        </template>
                        <template v-else>
                            <p>Following nobody yet.</p>
                        </template>
                    </v-tab-item>
                    <v-tab-item key="Following">
                        <template v-if="!following == 'undefined' || !following.length == 0">
                            <v-card
                            :to="`/profile/${b._id}`"
                            v-for="b in following" :key="b._id"
                            tile
                            outlined
                            >
                              <v-card-text>
                                <v-img max-width=40 :src="b.profileImageUrl"></v-img>
                                {{ b.firstName + ' ' + b.lastName }}
                              </v-card-text>
                            </v-card>
                        </template>
                        <template v-else>
                            <p>Nobody following yet.</p>
                        </template>
                    </v-tab-item>
                </v-tabs>
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
      followers: [],
      following: []
    }
  },
  created () {
    let vm = this
    let userId = this.$route.params.id
    let url = `http://localhost:3000/user/getFollowings/${userId}`
    let method = 'GET'

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${vm.token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(resData => {
        vm.followers = resData.followers
        vm.following = resData.following
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.v-tab {
  font-size: 1.4rem!important;
}

.v-card__text {
  font-size: 1.5rem!important;
}

.v-card__text a {
  text-decoration: none;
  color: #000;
}
</style>
