<template>
  <div class="text-center">
    <template v-if="isSignupMode">
      <signup-form></signup-form>
      <p class="h6 mt-2 d-inline-block" style="cursor: pointer" @click="changeMode()">アカウントをお持ちの方はこちら</p>
    </template>

    <template v-else>
      <signin-form></signin-form>
      <p class="h6 mt-2 d-inline-block" style="cursor: pointer" @click="changeMode()">メールアドレスでの登録はこちら</p>
    </template>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
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

<style scoped>
.text-sm {
  font-size: 12px;
}
</style>