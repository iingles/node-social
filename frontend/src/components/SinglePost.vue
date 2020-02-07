<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>
              <h1 v-if="viewMode">View Post</h1>
              <h1 v-if="editMode">Edit Post</h1>
              <h1 v-if="!editMode && !viewMode">New Post</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="title" name="title" v-model="postData.title" ></v-text-field>
                <v-textarea label="content" name="content" v-model="postData.content"></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancelPost()">cancel</v-btn>
                <v-btn v-if="!editMode" @click="()=>{this.$emit('edit')}">edit</v-btn>
                <v-btn v-if="!viewMode && postData.content || editMode && postData.content" @click="acceptPost(postData)">accept</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    editMode: Boolean,
    fetchedPostData: Object,
    viewMode: Boolean
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
  watch: {
    viewMode () {
      if (this.viewMode) {
        this.postData = this.fetchedPostData.post
      }
    }
  },
  methods: {
    cancelPost () {
      this.postData = {}
      this.$emit('cancel')
    },
    acceptPost (postData) {
      let vm = this

      // If we are in editing mode, send the request to the "put" route
      // Else, send the request to the regular save post route
      if (vm.editMode) {
        vm.$emit('editedPost', postData)
      } else {
        vm.$emit('accept', postData)
      }
    }
  }
}
</script>

<style scoped>
</style>
