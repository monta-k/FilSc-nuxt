<template>
  <div class="text-center">
    <template v-if="isSignupMode">
      <signup-card></signup-card>
      <p class="h6 mt-2 d-inline-block" style="cursor: pointer" @click="changeMode()">アカウントをお持ちの方はこちら</p>
    </template>

    <template v-else>
      <signin-card></signin-card>
      <p class="h6 mt-2 d-inline-block" style="cursor: pointer" @click="changeMode()">メールアドレスでの登録はこちら</p>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
import SigninCard from '~/components/organisms/SigninCard.vue'
import SignupCard from '~/components/organisms/SignupCard.vue'

@Component({
  components: {
    SigninCard,
    SignupCard
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