<template>
  <div class="signin-card">
    <button class="btn btn-rounded btn-danger" @click="googleSignin">
      <font-awesome-icon :icon="['fab','google']" />
      |
      <p class="font-weight-bold d-inline-block">Googleログイン</p>
    </button>

    <p class="h5 md-w50">- or -</p>

    <signin-form></signin-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '~/plugins/firebase.ts'
import SigninForm from '~/components/molecules/SigninForm.vue'
import * as Vuex from 'vuex'

@Component({
  components: {
    SigninForm
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  async googleSignin() {
    try {
      this.$store.dispatch('loading')
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
}
</script>

<style scoped>
.signin-card {
  padding: 30px 10px;
  border: solid 0.2px gray;
  border-radius: 10px;
  background-color: #eee;
}

@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
    margin: auto;
  }
}
</style>