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
    <button class="btn btn-dark" @click="signin()">
      <font-awesome-icon :icon="['fas','envelope']" />
      |
      メールアドレスでログインする
    </button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async googleSignin() {
      try {
        this.loading()
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await firebase.auth().signInWithPopup(provider)
        const idToken = await res.user.getIdToken(true)
        this.$axios.setHeader('Authorization', idToken)
        const result = await this.$axios.$post(`${process.env.BaseUrl}/signin`)
        console.log(result)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        this.notLoading()
      }
    },
    async signin() {
      try {
        this.loading()
        const res = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        const idToken = await res.user.getIdToken(true)
        this.$axios.setHeader('Authorization', idToken)
        const result = await this.$axios.$post(`${process.env.BaseUrl}/signin`)
        console.log(result)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        this.notLoading()
      }
    },
    ...mapActions('users', ['setUser']),
    ...mapActions(['loading', 'notLoading'])
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