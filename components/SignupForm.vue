<template>
  <div class="signup-card">
    <form class="md-w50">
      <div class="form-group text-left">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group text-left">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group text-left">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
    </form>
    <button class="btn btn-dark" @click="signup()">
      <font-awesome-icon :icon="['fas','check']" />
      ユーザー登録する
    </button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: null,
      email: '',
      password: '',
    }
  },
  methods: {
    async signup() {
      try {
        this.loading()
        this.setNewUserName(this.name)
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      } catch (e) {
        console.log(e)
      } finally {
        this.notLoading()
      }
    },
    ...mapActions('users', ['setNewUserName']),
    ...mapActions(['loading', 'notLoading'])
  }
}
</script>

<style scoped>
.signup-card {
  padding: 30px 10px;
  border: solid 0.2px gray;
  border-radius: 10px;
  background-color: #eee;
  margin-top: 100px;
}

@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
    margin: auto;
  }
}
</style>