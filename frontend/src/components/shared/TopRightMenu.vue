<template>
    <v-list>
        <v-list-item to="/messages"><v-icon>mdi-message-text</v-icon>Messages</v-list-item>
        <v-list-item to="/add-contact"><v-icon>mdi-account-plus</v-icon>Add Contact</v-list-item>
        <v-list-item to="/settings"><v-icon>mdi-settings-outline</v-icon>Settings</v-list-item>
        <v-list-item to="/help"><v-icon>mdi-help</v-icon>Help</v-list-item>
        <v-list-item to="/about"><v-icon>mdi-information-outline</v-icon>About</v-list-item>
        <v-list-item @click="() => this.$emit('logout')"><v-icon>mdi-exit-to-app</v-icon>Logout</v-list-item>
    </v-list>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
