<template>
  <div class="signup-card">
    <form class="md-w50">
      <div class="form-group text-left">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group text-left">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group text-left">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
    </form>
    <p class="text-danger mb-2">{{ errorMessage }}</p>
    <app-button @click="signup()">
      <font-awesome-icon :icon="['fas','check']" />
      ユーザー登録する
    </app-button>
  </div>
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
  name: string | null = null
  email: string = ''
  password: string = ''
  errorMessage: string | null = null

  async signup() {
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
  isInvalid() {
    if (this.name === null) {
      return this.errorMessage = '名前が未入力です'
    }
    if (this.email === '') {
      return this.errorMessage = 'メールアドレスが未入力です'
    }
    if (this.password === '') {
      return this.errorMessage = 'パスワードが未入力です'
    }
    return false
  }
}
</script>

<style scoped>
.signup-card {
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