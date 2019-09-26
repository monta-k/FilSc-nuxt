<template>
  <nav class="navbar" style="height: 60px;">
    <div class="navbar-content d-flex justify-content-between">
      <a href="/" style="text-decoration:none">
        <h2 class="app-title h2 mb-0 d-inline-block">FilSc</h2>
      </a>
      <app-dropdown v-if="isAuthenticated" label="設定" :list-items="listItems" :action="action" />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import firebase from '~/plugins/firebase.ts'
import AppDropdown from '~/components/atoms/AppDropdown.vue'

@Component({
  components: {
    AppDropdown
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore

  showDropdown: boolean = false
  listItems: Object = {
    1: 'ユーザー情報',
    2: 'ログアウト'
  }
  action: Function = (key: string) => {
    if (key === '1') {
      this.toSettingPage()
    }
    if (key === '2') {
      this.signout()
    }
  }

  get isAuthenticated () {
    return this.$store.getters['users/isAuthenticated']
  }

  async signout () {
    try {
      await firebase.auth().signOut()
      console.log('signout')
    } catch (e) {
      console.log(e)
    }
  }

  toSettingPage() {
    this.$router.push('/setting')
  }
}
</script>

<style scoped>
.app-title {
  color: black;
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
@media (max-width: 575px) {
  .navbar-content {
      width: 100%;
      margin: auto;
  }
}
</style>
