<template>
  <v-app>
    <Header
      v-if="auth"
      @logout="logout()"
    />
    <v-content>
      {{ this.$store.getters.token }}
      <router-view
      :token="idToken"
      :authUser="userId"
      :key="$route.fullPath"
      ></router-view>
    </v-content>
    <Footer
      v-if="auth"
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
    idToken: null,
    userId: null
  }),
  created () {
    this.$store.dispatch('tryAutoLogin')
  },
  computed: {
    auth () {
      return this.$store.getters.token ? this.$store.getters.token : false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
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
