<template>
  <nav class="navbar navbar-dark bg-dark">
    <h2 class="app-title h2">FilSc</h2>
    <button class="btn btn-rounded btn-dark" v-if="isAuthenticated" @click="signout">ログアウト</button>
  </nav>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('users', ['isAuthenticated'])
  },
  methods: {
    async signout() {
      try {
        await firebase.auth().signOut()
        this.resetUser
        this.$router.push('/signin')
        console.log('signout')
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions('users', ['resetUser'])
  }
}
</script>

<style scoped>
.app-title {
  color: white;
  letter-spacing: 0.5rem;
  font-family: 'Impact';
}
</style>