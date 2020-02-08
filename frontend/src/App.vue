<template>
  <v-app>
      <!-- <MainNav/>
      <router-view /> -->
      <Signup />
  </v-app>
</template>

<script>
// import MainNav from './components/shared/MainNav'
import Signup from './views/Signup'

export default {

  name: 'App',

  components: {
    // MainNav
    Signup
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
</style>
