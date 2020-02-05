<template>
  <v-app>
      <MainNav/>
      <router-view />
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
    //
  })
}
</script>

<style scoped>
</style>
