<template>
  <div>
    <div class="form-group text-left">
      <label>Name</label>
      <input v-model="newName" type="text" class="form-control">
    </div>
    <p class="text-danger">{{ errorMessage }}</p>
    <p class="text-success">{{ successMessage }}</p>
    <app-button @click="updateUserName">名前を変更する</app-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppButton from '~/components/atoms/AppButton.vue'

@Component({
  components: {
    AppButton
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore

  newName: string = this.userName
  successMessage: string | null = null
  errorMessage: string | null = null

  get user() {
    return this.$store.getters['users/user']
  }
  get userName() {
    if (this.user) {
      return this.user.name
    }
    return ''
  }

  async updateUserName() {
    if (this.newName === '') {
      this.errorMessage = '名前は1文字以上にしてください'
      return
    }
    try {
      this.clearMessage()
      await this.$store.dispatch('users/updateUserName', { name: this.newName })
      this.successMessage = '名前を変更しました'
    } catch(e) {
      console.log(e)
      this.errorMessage = '名前の変更に失敗しました'
    }
  }
  clearMessage() {
    this.successMessage = null
    this.errorMessage = null
  }
}
</script>
