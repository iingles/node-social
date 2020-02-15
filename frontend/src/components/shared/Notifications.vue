<template>
    <v-list>
        <v-list-item><v-icon color="green">mdi-account-plus</v-icon><span class="menu-text">New Follower: John Doe</span></v-list-item>
        <v-list-item><v-icon color="red">mdi-alert-circle</v-icon><span class="menu-text">Password Changed</span></v-list-item>
        <v-list-item><v-icon color="green">mdi-alert-circle</v-icon><span class="menu-text">Someone replied to your post</span></v-list-item>
        <v-list-item><v-icon color="green">mdi-thumb-up</v-icon><span class="menu-text">Someone liked your post</span></v-list-item>
        <v-list-item><v-icon color="yellow">mdi-message</v-icon><span class="menu-text">You have unread messages</span></v-list-item>
        <v-list-item><v-icon color="red">mdi-alert-circle</v-icon><span class="menu-text">Email address updated</span></v-list-item>
    </v-list>
</template>

<script>
export default {
}
</script>

<style scoped>
    .menu-text {
        margin-left: 1rem;
    }
</style>
