<template>
  <div>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
    </form>
    <button class="btn btn-dark" @click="signup()">ユーザー登録する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async signup() {
      try {
        this.loading()
        const res = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        const idToken = await res.user.getIdToken(true)
        this.$axios.setHeader('Authorization', idToken)
        const result = await this.$axios.$post('http://localhost:3000/api/v1/signin', { name: this.name })
        console.log(result)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        this.notLoading()
      }
    },
    ...mapActions(['loading', 'notLoading'])
  }
}
</script>