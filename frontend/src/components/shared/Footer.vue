<template>
    <v-app-bar
    app
    bottom
    fixed
    dense
    dark
    color="blue"
    >
    <v-spacer></v-spacer>
    <div class="d-flex align-center bottom-nav">
        <router-link to="/feed"><v-icon>mdi-home</v-icon></router-link>
        <router-link :to="`/profile/${localStorage.getItem('userId')}`"><v-icon>mdi-account</v-icon></router-link>
        <router-link to="/messages"><v-icon>mdi-message-text</v-icon></router-link>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-badge
            color="red"
            content="6"
            offset-x="25"
            offset-y="20"
            >
            <v-btn
              dark
              icon
              v-on="on"
            >
            <v-icon>mdi-bell</v-icon>
            </v-btn>
            </v-badge>
          </template>
          <Notifications/>
        </v-menu>
    </div>
    <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
import Notifications from './Notifications'

export default {
  components: {
    Notifications
  },
  data: () => {
    return {
      localStorage: localStorage
    }
  }
}
</script>

<style scoped>
    .bottom-nav a {
        margin: 0 1rem;
        text-decoration: none;
    }
</style>
