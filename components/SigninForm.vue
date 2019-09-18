<template>
  <div class="signin-card">
    <button class="btn btn-rounded btn-danger" @click="googleSignin">
      <font-awesome-icon :icon="['fab','google']" />
      |
      <p class="font-weight-bold d-inline-block">Googleログイン</p>
    </button>

    <p class="h5 md-w50">- or -</p>

    <form class="md-w50">
      <div class="form-group text-left">
        <input type="email" placeholder="Email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" class="form-control" v-model="password">
      </div>
    </form>
    <p class="text-danger mb-2">{{ errorMessage }}</p>
    <button class="btn btn-dark" @click="signin()">
      <font-awesome-icon :icon="['fas','envelope']" />
      |
      メールアドレスでログインする
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
import * as Vuex from 'vuex'

@Component({})

export default class extends Vue {
  $store!: Vuex.ExStore
  email: string = ''
  password: string = ''
  errorMessage: string | null = null

  async googleSignin() {
    try {
      this.$store.dispatch('loading')
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
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

<style scoped>
.signin-card {
  padding: 30px 10px;
  border: solid 0.2px gray;
  border-radius: 10px;
  background-color: #eee;
  margin-top: 100px;
}

@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
    margin: auto;
  }
}
</style>