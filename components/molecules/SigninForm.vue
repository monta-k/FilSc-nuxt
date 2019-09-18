<template>
  <form class="md-w50">
      <div class="form-group text-left">
        <input type="email" placeholder="Email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" class="form-control" v-model="password">
      </div>

      <p class="text-danger mb-2">{{ errorMessage }}</p>
      <app-button @click.prevent="signin()">
        <font-awesome-icon :icon="['fas','envelope']" />
        |
        メールアドレスでログインする
      </app-button>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
import AppButton from '~/components/atoms/AppButton.vue'
import * as Vuex from 'vuex'

@Component({
  components: {
    AppButton
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore
  email: string = ''
  password: string = ''
  errorMessage: string | null = null

  async signin() {
    try {
      this.errorMessage = null
      this.$store.dispatch('loading')
      if (this.isInvalid()) {
        return
      }
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    } catch (e) {
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-email') {
        this.errorMessage = 'メールアドレスまたはパスワードが間違っています。'
      }
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
  isInvalid(): string | false {
    if (this.email === '') {
      return this.errorMessage = 'メールアドレスが入力されていません'
    }
    if (this.password === '') {
      return this.errorMessage = 'パスワードが入力されていません'
    }
    return false
  }
}
</script>