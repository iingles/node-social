<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>
                <h1>New Post</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="title" name="title" v-model="postData.title" ></v-text-field>
                <v-textarea label="content" name="content" v-model="postData.content"></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancelPost()">cancel</v-btn>
                <v-btn @click="acceptPost(postData)">accept</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data: () => {
    return {
      postData: {
        title: '',
        content: '',
        creator: 'Isaac'
      }
    }
  },
  methods: {
    cancelPost () {
      this.$emit('cancel')
    },
    acceptPost (postData) {
      this.$emit('accept', postData)
    }
  }
}
</script>

<style scoped>
</style>
