<template>
  <div>
    <div v-if="isSignupMode">
      <signup-form></signup-form>
      <button @click="changeMode()">Signin</button>
    </div>

    <div v-else>
      <signin-form></signin-form>
      <button @click="changeMode()">Signup</button>
    </div>
  </div>
</template>

<script>
import SigninForm from '~/components/SigninForm'
import SignupForm from '~/components/SignupForm'

export default {
  data() {
    return {
      isSignupMode: false
    }
  },
  methods: {
    changeMode() {
      this.isSignupMode = !this.isSignupMode
    }
  },
  components: {
    SigninForm,
    SignupForm
  }
} 
</script>