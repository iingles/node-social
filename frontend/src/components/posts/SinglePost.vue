<template>
    <div>
        <h1>{{ post.title }}</h1>
        <h2>{{ post.creator.name }}</h2>
        <p>{{ post.content }}</p>
        <v-btn @click="()=>{this.$emit('view', post._id)}">view</v-btn>
        <v-btn @click="()=>{this.$emit('delete', post._id)}">delete</v-btn>
        <v-icon>mdi-dots-vertical</v-icon>
    </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style scoped>
</style>
