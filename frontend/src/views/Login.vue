<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" xs="9" sm="9" md="6" lg="4">
        <v-card class="pa-10">
          <v-card-title>
            <h1>Social Network App</h1>
          </v-card-title>
          <v-card-title>Welcome, please login</v-card-title>
          <v-form @submit.prevent="loginHandler" @keyup.enter="loginHandler" ref="loginForm">
            <v-text-field v-model.lazy="email" label="Email" :rules="emailRules"></v-text-field>
            <v-text-field
              v-model.lazy="password"
              label="Password"
              type="password"
              :rules="passwordRules"
            ></v-text-field>
            <v-btn @click="loginHandler" type="submit" rounded color="blue" dark>Submit</v-btn>
          </v-form>
        </v-card>
        <v-select
          :items="peoples"
          item-text="firstName"
          label="Select a Demo User"
          return-object
          @input="selectDemo"
        ></v-select>
        <p>
          Don't have an account?
          <router-link to="/signup">Sign Up</router-link>
        </p>
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
import { people } from '../../data/people'

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
      passwordRules: [v => !!v || 'Password is required'],
      peoples: []
    }
  },
  created () {
    const vm = this

    for (let i = 0; i < people.length; i++) {
      const person = {
        firstName: people[i].firstName,
        lastName: people[i].lastName,
        email: people[i].email,
        password: people[i].password
      }
      vm.peoples.push(person)
    }
  },
  methods: {
    loginHandler () {
      let vm = this

      event.preventDefault()
      // Set the local login state to true here

      fetch('http://206.189.215.72:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: vm.email,
          password: vm.password
        })
      })
        .then(res => {
          if (res.status === 422) {
            throw new Error('Validation failed.')
          }
          if (res.status !== 200 && res.status !== 201) {
            console.log('Error!')
            throw new Error('Could not authenticate you!')
          }
          return res.json()
        })
        .then(resData => {
          localStorage.setItem('token', resData.token)
          localStorage.setItem('userId', resData.userId)
          // If successful, redirect to feed
          location.replace('/feed')
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectDemo (obj) {
      const vm = this

      vm.email = obj.email
      vm.password = obj.password
    }
  }
}
</script>

<style scoped>
.login-card {
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
