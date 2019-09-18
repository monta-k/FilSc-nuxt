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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
import SigninForm from '~/components/SigninForm.vue'
import SignupForm from '~/components/SignupForm.vue'

@Component({
  components: {
    SigninForm,
    SignupForm
  }
})
export default class extends Vue {
  isSignupMode: Boolean = false

  changeMode(): void {
    this.isSignupMode = !this.isSignupMode
  }
}
</script>

<style scoped>
.text-sm {
  font-size: 12px;
}
</style>