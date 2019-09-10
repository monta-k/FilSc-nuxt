<template>
  <div>
    <h2 class="h2">FilScへようこそ</h2>
    <h4 class="h4">あなたのFilmarks IDを入力してください</h4>
    <h5 class="h5 text-danger">{{ errorMessage }}</h5>
    <div class="form-group">
      <input type="text" placeholder="FilmarksのIDを入力" class="form-control" v-model="searchId">
    </div>
    <button class="btn btn-dark" @click="search()">
      <font-awesome-icon :icon="['fas','search']" />
      |
      Filmarksアカウントを検索する
    </button>

    <modal-view v-if="modal">
      <template slot="header">
        <div class="row">
          <div class="col-12">
            <h4 class="h4">見つかったユーザー</h4>
          </div>
          <div class="col-12">
            <a :href="filmarks_user.url">Filmarksのページへ</a>
          </div>
        </div>
      </template>
      <template slot="body">
        <div class="row">
          <div class="col-4">
            <img :src="filmarks_user.profile_image" alt="アカウント画像">
          </div>
          <div class="col-8 text-right">
            <h5 class="h5">{{ filmarks_user.profile_name }}</h5>
            <h5 class="h5">{{ filmarks_user.profile_id }}</h5>
          </div>
        </div>
      </template>
      <template slot="footer">
        <button class="btn btn-dark">登録する</button>
        <button class="btn btn-dark" @click="closeModal()">キャンセル</button>
      </template>
    </modal-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalView from '~/components/ModalView'

export default {
  data() {
    return {
      searchId: '',
      filmarks_user: null,
      modal: false
    }
  },
  computed: {
    ...mapGetters(['errorMessage'])
  },
  methods: {
    async search() {
      if (this.searchId === '') return
      try {
        this.resetError()
        this.filmarks_user = null
        this.loading()
        this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
        const data = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/find_user`, { params: { searchId: this.searchId } })
        this.filmarks_user = data
        this.openModal()
      } catch (e) {
        console.log(e)
        this.setError('ユーザーが存在しません')
      } finally {
        this.notLoading()
      }
    },
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    ...mapActions(['loading', 'notLoading', 'setError', 'resetError'])
  },
  components: {
    ModalView
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