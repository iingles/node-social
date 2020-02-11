<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.creator }}</p>
        <p>{{ post.content }}</p>
        <v-btn icon @click="()=>{this.$emit('view', post._id)}"><v-icon>mdi-card-search-outline</v-icon>view</v-btn>
        <v-btn icon @click="()=>{this.$emit('delete', post._id)}"><v-icon>mdi-pencil-outline</v-icon>edit</v-btn>
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
