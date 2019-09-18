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
          <div class="col-12">
            <h4 class="h4" v-if="isFetching">{{ fetchingProcess }}</h4>
            <h4 class="h4" v-if="!isFetching">映画情報を取得しました</h4>
          </div>
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
        <movies-list></movies-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MoviesList from '~/components/MoviesList.vue'
import ModalView from '~/components/ModalView.vue'
import * as Vuex from 'vuex'
import { Movie } from '~/store/type'

interface FilmarksProfile {
  url: string
  profile_image: string
  profile_name: string
  profile_id: string
}
interface Fetching {
  pages: number | null
  current_page: number | null
}

@Component({
  components: {
    ModalView,
    MoviesList
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  filmarks_profile: FilmarksProfile = {
    url: '',
    profile_image: '',
    profile_name: '',
    profile_id: ''
  }
  modal: boolean = false
  fetching: Fetching = {
    pages: null,
    current_page: null
  }
  isFetching: boolean = false
  newMovies: Array<Movie> = []

  async mounted() {
    try {
      this.$store.dispatch('loading')
      if (this.$store.getters['users/user']) {
        this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
        const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/find_user`, { params: { searchId: this.$store.getters['users/user'].filmarks_id } })
        this.filmarks_profile = data
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.dispatch('notLoading')
    }
  }

  get fetchingProcess() {
    if (this.fetching.pages && this.fetching.current_page) return `${this.fetching.current_page}/${this.fetching.pages}`
  }

  closeModal() {
      this.modal = false
    }
    async fetchLatestClipMovies() {
      try {
        if (this.$store.getters['users/user']) {
          this.newMovies = []
          this.isFetching = true
          this.modal = true
          this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
          const pageData = await this.$axios.$get(`${process.env.BaseUrl}/scrape/clip_movies_page`, { params: { userId: this.$store.getters['users/user'].filmarks_id } })
          this.fetching.pages = Number(pageData.pages)
          for (let i = 1; i < this.fetching.pages + 1; i++) {
            this.fetching.current_page = i
            const movieData = await this.$store.dispatch('fetchClipMovies', { userId: this.$store.getters['users/user'].filmarks_id, page: i})
            this.newMovies = this.newMovies.concat(movieData.movies)
          }
          console.log(this.newMovies)
          this.isFetching = false
        }
      } catch (e) {
      }
    }
    async updateClipMovies() {
      try {
        this.$store.dispatch('updateClipMoviesDB', { movies: this.newMovies })
      } catch (e) {
        console.log(e)
      } finally {
        this.closeModal()
      }
    }
}
</script>