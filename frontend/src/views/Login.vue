<template>
    <v-container>
        <v-row class="xs-12 md-6 lg-8 xs-ma-0 lg-ma-10">
            <v-col cols="12">
                <v-card class="pa-10">
                    <v-card-title>Welcome, please login</v-card-title>
                    <v-form @submit.prevent="onSubmit" @keyup.enter="onSubmit" ref="loginForm">
                        <v-text-field
                            v-model.lazy="userName"
                            label="Username"
                            :rules="userNameRules"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model.lazy="password"
                            label="Password"
                            type="password"
                            :rules="passwordRules"
                        >
                        </v-text-field>
                        <v-btn
                        @click="onSubmit"
                        type="submit"
                        rounded
                        color="blue"
                        dark
                        >Submit</v-btn>
                    </v-form>
                </v-card>
                <router-link to="/signup">Sign Up</router-link>
                <transition name="fade" mode="out-in">
                    <template v-if="hasErrors">
                        <p :style="'color:red'">Please correct the errors before submitting.</p>
                    </template>
                </transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
  data: () => {
    return {
      hasErrors: false,
      userName: '',
      password: '',
      userNameRules: [
        v => !!v || 'Username is required.',
        v => v.length <= 16 || 'Username cannot exceed 15 characters.',
        v => /^[a-zA-Z\-_]*$/.test(v) || 'Username can only contain letters, dashes, or underscores.'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => !/[;,/"']/.test(v) || 'Password cannot contain semicolons, commas, or quotes.',
        v => v.length >= 10 || 'Password must be 10 or more characters and contain at least one number.',
        v => /[0-9]/.test(v) || 'Password must contain at least one number.'
      ]
    }
  },
  methods: {
    onSubmit () {
      let vm = this

      if (this.$refs.loginForm.validate()) {
        vm.hasErrors = false
        // const formData = {
        //   userName: this.userName,
        //   password: this.password
        // }
        this.$store.dispatch('userLoggedIn', {
          userName: this.userName,
          password: this.password,
          loggedIn: true
        })
      } else { vm.hasErrors = true }
    }
  }
}

</script>

<style scoped>
    .login-card {
        margin: 0 auto;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
