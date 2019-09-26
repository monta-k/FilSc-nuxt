<template>
  <div>
    <div class="form-group text-left">
      <label>Name</label>
      <input v-model="newName" type="text" class="form-control">
    </div>
    <div>
      <p class="text-danger">{{ errorMessage }}</p>
      <p class="text-success">{{ successMessage }}</p>
      <app-button @click="updateUserName()">名前を変更する</app-button>
    </div>

    <div class="mt-5">
      <hr>
      <app-button :is-danger="true" @click="modal = true">アカウントを削除する</app-button>
    </div>
    <modal-view v-if="modal">
      <template slot="body">
        <div>
          <p class="h5">本当に削除しますか?</p>
        </div>
      </template>

      <template slot="footer">
        <div class="text-center">
          <app-button :is-danger="true" @click="deleteUser">削除する</app-button>
          <app-button @click="modal = false">キャンセル</app-button>
        </div>
      </template>
    </modal-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppButton from '~/components/atoms/AppButton.vue'
import ModalView from '~/components/atoms/ModalView.vue'

@Component({
  components: {
    AppButton,
    ModalView
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore

  newName: string = this.userName
  successMessage: string | null = null
  errorMessage: string | null = null
  modal: boolean = false

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
  async deleteUser() {
    try {
      await this.$store.dispatch('users/deleteUser')
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
