<template>
  <v-app>
    <Header
      v-if="auth"
      @logout="logout()"
    />
    <v-content>
      <router-view
      :token="token"
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
import { mapGetters } from 'vuex'

export default {

  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
  }),
  created () {
    this.$store.dispatch('tryAutoLogin')
  },
  computed: {
    ...mapGetters(['token', 'userId']),
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
