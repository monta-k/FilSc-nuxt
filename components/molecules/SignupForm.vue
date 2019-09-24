<template>
  <form class="md-w50">
    <div class="form-group text-left">
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" class="form-control">
    </div>
    <div class="form-group text-left">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" class="form-control">
    </div>
    <div class="form-group text-left">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" class="form-control">
    </div>
    <p class="text-danger mb-2">
      {{ errorMessage }}
    </p>
    <app-button @click.prevent="signup()">
      <font-awesome-icon :icon="['fas','check']" />
      ユーザー登録する
    </app-button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import firebase from '~/plugins/firebase.ts'
import AppButton from '~/components/atoms/AppButton.vue'

@Component({
  components: {
    AppButton
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore
  name: string | null = null
  email: string = ''
  password: string = ''
  errorMessage: string | null = null

  async signup () {
    try {
      this.errorMessage = null
      this.$store.dispatch('loading')
      if (this.isInvalid()) {
        return
      }
      this.$store.dispatch('users/setNewUserName', this.name)
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    } catch (e) {
      if (e.code === 'auth/email-already-in-use' || e.code === 'auth/invalid-email') {
        this.errorMessage = '無効なメールアドレスです'
      }
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
  isInvalid (): string | false {
    if (this.name === null) {
      this.errorMessage = '名前が未入力です'
      return this.errorMessage
    }
    if (this.email === '') {
      this.errorMessage = 'メールアドレスが未入力です'
      return this.errorMessage
    }
    if (this.password === '') {
      this.errorMessage = 'パスワードが未入力です'
      return this.errorMessage
    }
    return false
  }
}
</script>
