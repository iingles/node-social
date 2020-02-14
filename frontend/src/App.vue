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
    <Footer/>
  </v-app>
</template>

<script>
import MainNav from './components/shared/MainNav'
import Footer from './components/shared/Footer'

export default {

  name: 'App',

  components: {
    MainNav,
    Footer
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

<style>
html {
  font-size: 62.5%!important;
}

body {
  font-size: 1.5rem;
}
</style>
