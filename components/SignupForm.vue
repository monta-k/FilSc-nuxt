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
    <button class="btn btn-dark" @click="signup()">
      <font-awesome-icon :icon="['fas','check']" />
      ユーザー登録する
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions('users', ['setNewUserName']),
    ...mapActions(['loading', 'notLoading'])
  }
})

export default class extends Vue {
  name: string | null = null
  email: string = ''
  password: string = ''
  errorMessage: string | null = null

  setNewUserName!: (name: string | null) => void
  loading!: () => void
  notLoading!: () => void

  async signup() {
    try {
      this.errorMessage = null
      this.loading()
      if (this.isInvalid()) {
        return
      }
      this.setNewUserName(this.name)
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    } catch (e) {
      if (e.code === 'auth/email-already-in-use' || e.code === 'auth/invalid-email') {
        this.errorMessage = '無効なメールアドレスです'
      }
    } finally {
      this.notLoading()
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