<template>
    <v-app-bar
      app
      fixed
      dark
      color="blue"
      class="main-nav"
    >
      <v-spacer></v-spacer>
      <v-form id="main-search" method="POST" class="mt-8">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="search"
          rounded
          clearable
          light
          background-color="white"
        >
        </v-text-field>
      </v-form>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
          dark
          icon
          v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
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
      margin: 1rem 3rem;
  }

</style>
