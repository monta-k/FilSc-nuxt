<template>
  <nav class="navbar navbar-dark bg-dark fixed-top" style="height: 60px;">
    <a href="/" style="text-decoration:none">
      <h2 class="app-title h2 mb-0">FilSc</h2>
    </a>
    <button class="btn btn-rounded btn-dark" v-if="isAuthenticated" @click="signout">ログアウト</button>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase'
import * as Vuex from 'vuex'

@Component
export default class extends Vue {
  $store!: Vuex.ExStore

  get isAuthenticated() {
    return this.$store.getters['users/isAuthenticated']
  }

  async signout() {
    try {
      await firebase.auth().signOut()
      console.log('signout')
    } catch (e) {
      console.log(e)
    }
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