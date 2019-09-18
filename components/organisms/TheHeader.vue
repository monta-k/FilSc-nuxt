<template>
  <nav class="navbar navbar-dark bg-dark fixed-top" style="height: 60px;">
    <div class="navbar-content d-flex justify-content-between">
      <a href="/" style="text-decoration:none">
        <h2 class="app-title h2 mb-0 d-inline-block">FilSc</h2>
      </a>
      <button class="btn btn-rounded btn-dark" v-if="isAuthenticated" @click="signout">ログアウト</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
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

@media (min-width: 1200px) {
  .navbar-content {
      max-width: 1140px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .navbar-content {
      max-width: 960px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .navbar-content {
      max-width: 720px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .navbar-content {
      max-width: 540px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}
@media (max-width: 766px) {
  .navbar-content {
      width: 100%;
      margin: auto;
  }
}
</style>