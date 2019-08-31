<template>
  <div class="container">
    <h1 class="h1">FilSc</h1>
    <button class="btn btn-rounded btn-danger" @click="googleSignin">Googleログイン</button>
    <button class="btn btn-rounded btn-dark" @click="signout">ログアウト</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  methods: {
    async googleSignin() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const payload = await firebase.auth().signInWithPopup(provider)
        console.log(payload)
      } catch (e) {
        console.log(e)
      }
    },
    signout() {
      try {
        firebase.auth().signOut()
        console.log('signout')
      } catch (e) {
        console.log(e)
      }
    }
  }
} 
</script>