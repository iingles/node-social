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
        <router-link to="/feed"><v-icon>mdi-bell</v-icon></router-link>
    </div>
    <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
export default {
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
