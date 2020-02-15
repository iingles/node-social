<template>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" xs='9' sm='9' md='6' lg='4'>
          <v-card class="pa-10">
              <v-card-title><h1>Sign Up</h1></v-card-title>
              <v-form @submit.prevent="signUpHandler" @keyup.enter="signUpHandler" ref="signUpForm">
                  <v-text-field
                      v-model.lazy="firstName"
                      label="First Name"
                      :rules="nameRules"
                  >
                  </v-text-field>
                  <v-text-field
                      v-model.lazy="lastName"
                      label="Last Name"
                      :rules="nameRules"
                  >
                  </v-text-field>
                  <v-text-field
                      v-model.lazy="email"
                      label="E-Mail Address"
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
                  <v-text-field
                      v-model.lazy="rePass"
                      label="Re-Enter Password"
                      type="password"
                      :rules="passwordRules"
                  >
                  </v-text-field>
                  <v-btn
                  @click="signUpHandler"
                  type="submit"
                  rounded
                  color="blue"
                  dark
                  >Submit</v-btn>
              </v-form>
          </v-card>
          <p>Have an account? <router-link to="/login">Login Here.</router-link></p>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePass: '',
      nameRules: [
        v => !!v || 'Name is required.',
        v => v.length <= 16 || 'Name cannot exceed 20 characters.',
        v => /^[a-zA-Z\-_]*$/.test(v) || 'Name can only contain letters, dashes, or underscores.'
      ],
      emailRules: [
        // v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ || 'Please enter a valid email address.',
        v => !!v || 'email is required'
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
    signUpHandler () {
      event.preventDefault()

      let vm = this

      fetch('http://localhost:3000/auth/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: vm.email,
          firstName: vm.firstName,
          lastName: vm.lastName,
          password: vm.password
        })
      })
        .then(res => {
          if (res.status === 422) {
            throw new Error(
              "Validation failed.  Make sure that email address isn't used yet!"
            )
          } else {
            // if successful, redirect to login screen
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
