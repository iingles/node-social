<template>
  <v-app>
    <Header
      v-if="authToken"
      @logout="logout()"
    />
    <v-content>
      <router-view
      :token="authToken"
      :authUser="authUser"
      :key="$route.fullPath"
      ></router-view>
    </v-content>
    <Footer
      v-if="authToken"
    />
  </v-app>
</template>

<script>
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

export default {

  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
    authToken: localStorage.getItem('token'),
    authUser: localStorage.getItem('userId')
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

<style>
html {
  font-size: 62.5%!important;
}

body {
  font-size: 1.5rem;
}
</style>
