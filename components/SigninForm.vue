<template>
  <div>
    <button class="btn btn-rounded btn-danger" @click="googleSignin">Googleログイン</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  methods: {
    async googleSignin() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const payload = await firebase.auth().signInWithPopup(provider)
        this.$router.push('/')
        console.log(payload)
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions('users', ['setUser'])
  }
}
</script>