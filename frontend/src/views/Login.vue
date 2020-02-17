<template>
    <v-container>
        <v-row>
         <v-spacer></v-spacer>
            <v-col cols="12" xs='9' sm='9' md='6' lg='4'>
                <v-card class="pa-10">
                  <v-card-title><h1>Social Network App</h1></v-card-title>
                    <v-card-title>Welcome, please login</v-card-title>
                    <v-form @submit.prevent="loginHandler" @keyup.enter="loginHandler" ref="loginForm">
                        <v-text-field
                            v-model.lazy="email"
                            label="Email"
                            :rules="emailRules"
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
                        @click="loginHandler"
                        type="submit"
                        rounded
                        color="blue"
                        dark
                        >Submit</v-btn>
                    </v-form>
                </v-card>
                <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
                <transition name="fade" mode="out-in">
                    <template v-if="hasErrors">
                        <p :style="'color:red'">Please correct the errors before submitting.</p>
                    </template>
                </transition>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>

export default {
  data: () => {
    return {
      hasErrors: false,
      email: '',
      password: '',
      emailRules: [
        // v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ || 'Please enter a valid email address.',
        v => !!v || 'email is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 10 || 'Password must be 10 or more characters and contain at least one number.',
        v => /[0-9]/.test(v) || 'Password must contain at least one number.'
      ]
    }
  },
  methods: {
    loginHandler () {
      let vm = this

      event.preventDefault()
      // Set the local login state to true here
      this.$store.dispatch('login', {
        email: vm.email,
        password: vm.password
      })
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
