<template>
  <div style="padding-top:100px;">
    <div class="form-group text-left md-w50">
      <label>Name</label>
      <input v-model="newName" type="text" class="form-control">
    </div>
    <div>
      <p class="text-danger">
        {{ errorMessage1 }}
      </p>
      <p class="text-success">
        {{ successMessage1 }}
      </p>
      <app-button @click="updateUserName()">
        名前を変更する
      </app-button>
    </div>

    <p class="h5 mt-5">
      FilmarksIDを変更
    </p>
    <div class="form-group text-left md-w50">
      <input v-model="newFilmarksId" type="text" class="form-control">
    </div>
    <div>
      <p class="text-danger">
        {{ errorMessage2 }}
      </p>
      <p class="text-success">
        {{ successMessage2 }}
      </p>
      <app-button @click="search()">
        Filmarksアカウントを検索する
      </app-button>
    </div>

    <modal-view v-if="filmarksIdModal">
      <template slot="header">
        <div class="row">
          <div class="col-12">
            <h4 class="h4">
              見つかったユーザー
            </h4>
          </div>
          <div class="col-12">
            <a :href="newFilmarksUser.url" target="_blank" rel="noopener">Filmarksのページへ</a>
          </div>
        </div>
      </template>
      <template slot="body">
        <div class="row">
          <div class="col-4">
            <img :src="newFilmarksUser.profileImage" alt="アカウント画像">
          </div>
          <div class="col-8 text-right">
            <h5 class="h5">
              {{ newFilmarksUser.profileName }}
            </h5>
            <h5 class="h5">
              {{ newFilmarksUser.profileId }}
            </h5>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="text-center">
          <app-button @click="selectUser()">
            登録する
          </app-button>
          <app-button @click="filmarksIdModal = false">
            キャンセル
          </app-button>
        </div>
      </template>
    </modal-view>

    <div class="mt-5">
      <hr class="w-100">
      <app-button :is-danger="true" @click="deleteUserModal = true">
        アカウントを削除する
      </app-button>
    </div>

    <modal-view v-if="deleteUserModal">
      <template slot="body">
        <div>
          <p class="h5">
            本当に削除しますか?
          </p>
        </div>
      </template>

      <template slot="footer">
        <div class="text-center">
          <app-button :is-danger="true" @click="deleteUser">
            削除する
          </app-button>
          <app-button @click="deleteUserModal = false">
            キャンセル
          </app-button>
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
  newFilmarksId: string = this.userFilmarksId
  newFilmarksUser: Object | null = null
  successMessage1: string | null = null
  successMessage2: string | null = null
  errorMessage1: string | null = null
  errorMessage2: string | null = null
  deleteUserModal: boolean = false
  filmarksIdModal: boolean = false

  get user () {
    return this.$store.getters['users/user']
  }
  get userName () {
    if (this.user) {
      return this.user.name
    }
    return ''
  }
  get userFilmarksId () {
    if (this.user) {
      return this.user.filmarksId
    }
    return ''
  }

  async updateUserName () {
    if (this.newName === '') {
      this.errorMessage1 = '名前は1文字以上にしてください'
      return
    }
    try {
      this.clearMessage()
      await this.$store.dispatch('users/updateUserName', { name: this.newName })
      this.successMessage1 = '名前を変更しました'
    } catch (e) {
      console.log(e)
      this.errorMessage1 = '名前の変更に失敗しました'
    }
  }
  clearMessage () {
    this.successMessage1 = null
    this.successMessage2 = null
    this.errorMessage1 = null
    this.errorMessage2 = null
  }
  async deleteUser () {
    try {
      await this.$store.dispatch('users/deleteUser')
    } catch (e) {
      console.log(e)
    }
  }
  async search () {
    if (this.newFilmarksId === '') { return }
    try {
      this.clearMessage()
      this.newFilmarksUser = null
      this.$store.dispatch('loading')
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/find_user`, { params: { searchId: this.newFilmarksId } })
      this.newFilmarksUser = data
      this.filmarksIdModal = true
    } catch (e) {
      console.log(e)
      this.errorMessage2 = 'ユーザーが存在しません'
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
  async selectUser () {
    try {
      await this.$store.dispatch('loading')
      await this.$store.dispatch('users/setFilmarksId', { searchId: this.newFilmarksId })
      await this.$store.dispatch('resetClipMovies')
      this.successMessage2 = 'Filmarksアカウントを変更しました'
    } catch (e) {
      console.log(e)
      this.errorMessage2 = '変更に失敗しました'
    } finally {
      await this.$store.dispatch('notLoading')
      this.filmarksIdModal = false
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
  }
}
</style>
