<template>
  <v-app>
    <!-- <MainNav/> -->
    <v-content>
      <router-view
      :token="authToken"
      ></router-view>
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
    authToken: localStorage.getItem('token')
  })
}
</script>

<style scoped>
</style>
