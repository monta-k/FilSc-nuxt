<template>
  <div>
    <user-card :filmarks_profile="filmarks_profile"></user-card>

    <div class="text-center mt-5">
      <app-button @click="fetchLatestClipMovies()">最新の状態に更新</app-button>
    </div>

    <modal-view v-if="modal">
      <template slot="header">
        <div class="row">
          <div class="col-12" v-if="isFetching">
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
        <div class="text-center" v-if="!isFetching">
          <app-button @click="updateClipMovies()">更新する</app-button>
          <app-button @click="closeModal()">キャンセル</app-button>
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
import MoviesList from '~/components/organisms/MoviesList.vue'
import ModalView from '~/components/atoms/ModalView.vue'
import AppButton from '~/components/atoms/AppButton.vue'
import UserCard, { FilmarksProfile } from '~/components/molecules/UserCard.vue'
import * as Vuex from 'vuex'
import { Movie } from '~/store/type'

interface Fetching {
  pages: number | null
  current_page: number | null
}

@Component({
  components: {
    ModalView,
    MoviesList,
    AppButton,
    UserCard
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
        }
      } catch (e) {
      } finally {
        this.isFetching = false
        this.fetching.pages = null
        this.fetching.current_page = null
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