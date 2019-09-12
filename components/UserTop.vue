<template>
  <div>
    <div class="row">
      <div class="col-4">
        <img :src="filmarks_profile.profile_image" alt="カバー画像">
      </div>
      <div class="col-8">
        <h5 class="h5">{{ filmarks_profile.profile_name }}</h5>
        <h5 class="h5">{{ filmarks_profile.profile_id }}</h5>
      </div>
      <div class="col-6 text-center my-auto">
        <a :href="filmarks_profile.url" target="_blank" rel="noopener">Filmarksのページへ</a>
      </div>
      <div class="col-6 text-center">
        <button class="btn btn-dark" @click="fetchLatestClipMovies()">最新の状態に更新</button>
      </div>
    </div>

    <modal-view v-if="modal">
      <template slot="header">
        <div class="row">
          <div class="col-12">
            <h4 class="h4">データ取得中...</h4>
          </div>
        </div>
      </template>
      <template slot="body">
        <div class="row">
          <h4 class="h4" v-if="isFetching">{{ fetchingProcess }}</h4>
          <h4 class="h4" v-if="!isFetching">映画情報を取得しました</h4>
        </div>
      </template>
      <template slot="footer">
        <div v-if="!isFetching">
          <button class="btn btn-dark" @click="updateClipMovies()">更新する</button>
          <button class="btn btn-dark" @click="closeModal()">キャンセル</button>
        </div>
      </template>
    </modal-view>

    <div class="row mt-5">
      <div class="col-12">
        <h4 class="h4 text-center">Clipした映画</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalView from '~/components/ModalView'

export default {
  data() {
    return {
      filmarks_profile: {
        url: '',
        profile_image: '',
        profile_name: '',
        profile_id: '',
      },
      modal: false,
      fetching: {
        pages: null,
        current_page: null,
      },
      isFetching: false,
      newMovies: []
    }
  },
  async mounted() {
    try {
      this.loading()
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/find_user`, { params: { searchId: this.user.filmarks_id } })
      this.filmarks_profile = data
    } catch (e) {
      console.log(e)
    } finally {
      this.notLoading()
    }
  },
  computed: {
    fetchingProcess() {
      if (this.fetching.pages && this.fetching.current_page) return `${this.fetching.current_page}/${this.fetching.pages}`
    },
    ...mapGetters(['movies']),
    ...mapGetters('users', ['user'])
  },
  methods: {
    closeModal() {
      this.modal = false
    },
    async fetchLatestClipMovies() {
      try {
        this.newMovies = []
        this.isFetching = true
        this.modal = true
        this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
        const pageData = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/clip_movies_page`, { params: { userId: this.user.filmarks_id } })
        this.fetching.pages = Number(pageData.pages)
        for (let i = 1; i < this.fetching.pages + 1; i++) {
          this.fetching.current_page = i
          const movieData = await this.fetchClipMovies({ userId: this.user.filmarks_id, page: i})
          this.newMovies = this.newMovies.concat(movieData.movies)
        }
        console.log(this.newMovies)
        this.isFetching = false
      } catch (e) {
      }
    },
    async updateClipMovies() {
      try {
        this.updateClipMoviesDB({ movies: this.newMovies })
      } catch (e) {
        console.log(e)
      } finally {
        this.closeModal()
      }
    },
    ...mapActions(['loading', 'notLoading', 'fetchClipMovies', 'updateClipMoviesDB'])
  },
  components: {
    ModalView
  }
}
</script>