<template>
  <div>
    <single-input-form ref="nameForm" v-model="newName" title="名前を変更" button-name="名前を変更する" @click="updateUserName()" />

    <single-input-form ref="filmarksIdForm" v-model="newFilmarksId" title="FilmarksIDを変更" button-name="Filmarksアカウントを検索する" @click="search()" />

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
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { User } from '~/store/users/type'
import SingleInputForm from '~/components/molecules/SingleInputForm.vue'
import ModalView from '~/components/atoms/ModalView.vue'
import AppButton from '~/components/atoms/AppButton.vue'

@Component({
  components: {
    SingleInputForm,
    ModalView,
    AppButton
  }
})
export default class SettingForm extends Vue {
  $store!: Vuex.ExStore

  @Prop() user!: User

  newName: string = this.userName
  newFilmarksId: string = this.userFilmarksId
  newFilmarksUser: Object | null = null
  successMessage1: string | null = null
  successMessage2: string | null = null
  errorMessage1: string | null = null
  errorMessage2: string | null = null
  filmarksIdModal: boolean = false

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
    const nameForm: any = this.$refs.nameForm
    if (this.newName === '') {
      if (!nameForm) { return }
      nameForm.setErrorMessage('名前は1文字以上にしてください')
      return
    }
    try {
      await this.$store.dispatch('users/updateUserName', { name: this.newName })
      if (!nameForm) { return }
      nameForm.setSuccessMessage('名前を変更しました')
    } catch (e) {
      console.log(e)
      if (!nameForm) { return }
      nameForm.setErrorMessage('名前の変更に失敗しました')
    }
  }
  async search () {
    const filmarksIdForm: any = this.$refs.filmarksIdForm
    if (this.newFilmarksId === '') {
      filmarksIdForm.setErrorMessage('1文字以上で入力してください')
      return
    }
    try {
      this.newFilmarksUser = null
      this.$store.dispatch('loading')
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/find_user`, { params: { searchId: this.newFilmarksId } })
      this.newFilmarksUser = data
      this.filmarksIdModal = true
    } catch (e) {
      console.log(e)
      filmarksIdForm.setErrorMessage('ユーザーが存在しません')
    } finally {
      this.$store.dispatch('notLoading')
    }
  }
  async selectUser () {
    const filmarksIdForm: any = this.$refs.filmarksIdForm
    try {
      await this.$store.dispatch('loading')
      await this.$store.dispatch('users/setFilmarksId', { searchId: this.newFilmarksId })
      await this.$store.dispatch('resetClipMovies')
      filmarksIdForm.setSuccessMessage('Filmarksアカウントを変更しました')
    } catch (e) {
      console.log(e)
      filmarksIdForm.setErrorMessage('変更に失敗しました')
    } finally {
      await this.$store.dispatch('notLoading')
      this.filmarksIdModal = false
    }
  }
}
</script>
