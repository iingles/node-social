<template>
  <v-app>
      <!-- <MainNav/> -->
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <v-content>
        <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
// import MainNav from './components/shared/MainNav'

export default {

  name: 'App',

  components: {
    // MainNav
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
</style>
