<template>
  <v-app>
      <MainNav/>
      <v-content>
        <v-row no-gutters class="d-flex justify-center">
          <v-col cols="12" sm="12" md="12" lg="2">
            <router-view/>
          </v-col>
          <v-col class="center-section" cols="12" sm="12" md="12" lg="4">
            <router-view/>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="2">
            <router-view/>
          </v-col>
        </v-row>
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
    //
  })
}
</script>

<style scoped>
  .center-section {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
</style>
