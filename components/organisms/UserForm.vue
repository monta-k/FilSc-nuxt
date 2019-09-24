<template>
  <div>
    <h2 class="h2">
      FilScへようこそ
    </h2>
    <h4 class="h4">
      あなたのFilmarks IDを入力してください
    </h4>
    <h5 class="h5 text-danger">
      {{ errorMessage }}
    </h5>
    <div class="form-group">
      <input v-model="searchId" type="text" placeholder="FilmarksのIDを入力" class="form-control">
    </div>
    <app-button @click="search()">
      <font-awesome-icon :icon="['fas','search']" />
      |
      Filmarksアカウントを検索する
    </app-button>

    <modal-view v-if="modal">
      <template slot="header">
        <div class="row">
          <div class="col-12">
            <h4 class="h4">
              見つかったユーザー
            </h4>
          </div>
          <div class="col-12">
            <a :href="filmarksUser.url" target="_blank" rel="noopener">Filmarksのページへ</a>
          </div>
        </div>
      </template>
      <template slot="body">
        <div class="row">
          <div class="col-4">
            <img :src="filmarksUser.profileImage" alt="アカウント画像">
          </div>
          <div class="col-8 text-right">
            <h5 class="h5">
              {{ filmarksUser.profileName }}
            </h5>
            <h5 class="h5">
              {{ filmarksUser.profileId }}
            </h5>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="text-center">
          <app-button @click="selectUser()">
            登録する
          </app-button>
          <app-button @click="closeModal()">
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
import ModalView from '~/components/atoms/ModalView.vue'
import AppButton from '~/components/atoms/AppButton.vue'

@Component({
  components: {
    ModalView,
    AppButton
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  searchId: string = ''
  filmarksUser: Object | null = null
  modal: boolean = false

  get errorMessage () {
    return this.$store.getters.errorMessage
  }

  async selectUser () {
    try {
      await this.$store.dispatch('loading')
      await this.$store.dispatch('users/setFilmarksId', { searchId: this.searchId })
    } catch (e) {
      console.log(e)
    } finally {
      await this.$store.dispatch('notLoading')
    }
  }
  async search () {
    if (this.searchId === '') { return }
    try {
      this.$store.dispatch('resetError')
      this.filmarksUser = null
      this.$store.dispatch('loading')
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/find_user`, { params: { searchId: this.searchId } })
      this.filmarksUser = data
      this.openModal()
    } catch (e) {
      console.log(e)
      this.$store.dispatch('setError', 'ユーザーが存在しません')
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
  openModal () {
    this.modal = true
  }
  closeModal () {
    this.modal = false
  }
}
</script>

<style scoped>
@media screen and (min-width: 767px) {
  .form-group {
    width: 50%;
  }
}
</style>
