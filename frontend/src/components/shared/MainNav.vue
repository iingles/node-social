<template>
    <v-app-bar
      app
      fixed
      dense
      collapse-on-scroll
      color="primary"
      dark
      class="main-nav"
    >
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <router-link to="/feed"><v-icon>mdi-home</v-icon></router-link>
        <router-link to="/profile"><v-icon>mdi-account</v-icon></router-link>
      </div>

      <v-form id="main-search" method="POST">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="search"
          outlined
          clearable
          rounded
          filled
          light
          background-color="white"
        >
        </v-text-field>
      </v-form>

      <div class="d-flex justify-space-between align-center">
        <router-link to="/feed"><v-icon>mdi-bell</v-icon></router-link>
      </div>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
          dark
          icon
          v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <TopRightMenu
          @logout="()=>this.$emit('logout')"
        />
      </v-menu>
    </v-app-bar>
</template>

<script>
import TopRightMenu from './TopRightMenu'

export default {
  components: {
    TopRightMenu
  }
}
</script>

<style scoped>
 .main-nav a {
    margin: 0 .5rem;
    color: #fff;
    text-decoration: none;
  }

  #main-search {
      margin: 0 3rem;
  }

</style>
