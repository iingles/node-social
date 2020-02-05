<template>
    <v-app-bar
      app
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
        <router-link to="/feed"><v-icon>mdi-message-text</v-icon></router-link>
        <router-link to="/feed"><v-icon>mdi-account-plus</v-icon></router-link>
        <router-link to="/feed"><v-icon>mdi-help</v-icon></router-link>
        <router-link to="/feed"><v-icon>mdi-settings</v-icon></router-link>
        <router-link to="/about"><v-icon>mdi-information</v-icon></router-link>
      </div>
      <v-spacer></v-spacer>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-app-bar>
</template>

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
