<template>
  <div class="container">
    <signin-form v-if="mode === 'signin'"></signin-form>
    <signup-form v-if="mode === 'signup'"></signup-form>
  </div>
</template>

<script>
import SigninForm from '~/components/SigninForm'
import SignupForm from '~/components/SignupForm'

export default {
  data() {
    return {
      mode: 'signin'
    }
  },
  methods: {
    
  },
  components: {
    SigninForm,
    SignupForm
  }
} 
</script>