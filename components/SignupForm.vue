<template>
  <div>
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
    <button class="btn btn-dark" @click="signup()">ユーザー登録する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signup() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>