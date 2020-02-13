<template>
    <v-list>
        <v-list-item to="/messages"><v-icon>mdi-message-text</v-icon><span class="menu-text">Messages</span></v-list-item>
        <v-list-item to="/add-contact"><v-icon>mdi-account-plus</v-icon><span class="menu-text">Add Contact</span></v-list-item>
        <v-list-item to="/settings"><v-icon>mdi-settings-outline</v-icon><span class="menu-text">Settings</span></v-list-item>
        <v-list-item to="/help"><v-icon>mdi-help</v-icon><span class="menu-text">Help</span></v-list-item>
        <v-list-item to="/about"><v-icon>mdi-information-outline</v-icon><span class="menu-text">About</span></v-list-item>
        <v-list-item @click="() => this.$emit('logout')"><v-icon>mdi-exit-to-app</v-icon><span class="menu-text">Logout</span></v-list-item>
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
