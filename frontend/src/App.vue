<template>
  <v-app>
    <MainNav v-if="authToken"
      @logout="logout()"
    />
    <v-content>
      <router-view
      :token="authToken"
      ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MainNav from './components/shared/MainNav'

export default {

  name: 'App',

  components: {
    MainNav
  },

  data: () => ({
    authToken: localStorage.getItem('token')
  }),
  methods: {
    logout () {
      this.authToken = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login').catch(err => { throw err })
    }
  }
}
</script>

<style scoped>
</style>
