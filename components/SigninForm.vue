<template>
  <div>
    <button class="btn btn-rounded btn-danger" @click="googleSignin">Googleログイン</button>

    <p class="h4">- or -</p>

    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
    </form>
    <button class="btn btn-dark" @click="signin()">メールアドレスでログインする</button>
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
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await firebase.auth().signInWithPopup(provider)
        const idToken = await res.user.getIdToken(true)
        this.$axios.setHeader('Authorization', idToken)
        const result = await this.$axios.$post('http://localhost:3000/api/v1/signin')
        console.log(result)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
    async signin() {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        const idToken = await res.user.getIdToken(true)
        this.$axios.setHeader('Authorization', idToken)
        const result = await this.$axios.$post('http://localhost:3000/api/v1/signin')
        console.log(result)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions('users', ['setUser'])
  }
}
</script>