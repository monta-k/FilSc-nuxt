<template>
  <div>
    <user-card :filmarks-profile="filmarksProfile" />

    <div class="text-center mt-5">
      <app-button @click="fetchLatestClipMovies()">
        最新の状態に更新
      </app-button>
    </div>

    <modal-view v-if="modal">
      <template slot="header">
        <div class="row">
          <div v-if="isFetching" class="col-12">
            <h4 class="h4">
              データ取得中...
            </h4>
          </div>
        </div>
      </template>
      <template slot="body">
        <div class="row">
          <div class="col-12">
            <h4 v-if="isFetching" class="h4">
              {{ fetchingProcess }}
            </h4>
            <h4 v-if="!isFetching" class="h4">
              映画情報を取得しました
            </h4>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div v-if="!isFetching" class="text-center">
          <app-button @click="updateClipMovies()">
            更新する
          </app-button>
          <app-button @click="closeModal()">
            キャンセル
          </app-button>
        </div>
      </template>
    </modal-view>

    <div class="row mt-5">
      <div class="col-12">
        <movies-list />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import MoviesList from '~/components/organisms/MoviesList.vue'
import ModalView from '~/components/atoms/ModalView.vue'
import AppButton from '~/components/atoms/AppButton.vue'
import UserCard, { FilmarksProfile } from '~/components/molecules/UserCard.vue'
import { Movie } from '~/store/type'

interface Fetching {
  pages: number | null
  currentPage: number | null
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

  filmarksProfile: FilmarksProfile = {
    url: '',
    profileImage: '',
    profileName: '',
    profileId: ''
  }
  modal: boolean = false
  fetching: Fetching = {
    pages: null,
    currentPage: null
  }
  isFetching: boolean = false
  newMovies: Array<Movie> = []

  async mounted () {
    try {
      this.$store.dispatch('loading')
      if (this.$store.getters['users/user']) {
        this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
        const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/find_user`, { params: { searchId: this.$store.getters['users/user'].filmarksId } })
        this.filmarksProfile = data
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.dispatch('notLoading')
    }
  }

  get fetchingProcess () {
    if (this.fetching.pages && this.fetching.currentPage) { return `${this.fetching.currentPage}/${this.fetching.pages}` }
  }

  closeModal () {
    this.modal = false
  }
  async fetchLatestClipMovies () {
    try {
      if (this.$store.getters['users/user']) {
        this.newMovies = []
        this.isFetching = true
        this.modal = true
        this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
        const pageData = await this.$axios.$get(`${process.env.BaseUrl}/scrape/clip_movies_page`, { params: { userId: this.$store.getters['users/user'].filmarksId } })
        this.fetching.pages = Number(pageData.pages)
        for (let i = 1; i < this.fetching.pages + 1; i++) {
          this.fetching.currentPage = i
          const movieData = await this.$store.dispatch('fetchClipMovies', { userId: this.$store.getters['users/user'].filmarksId, page: i })
          this.newMovies = this.newMovies.concat(movieData)
        }
      }
    } catch (e) {
    } finally {
      this.isFetching = false
      this.fetching.pages = null
      this.fetching.currentPage = null
    }
  }
  async updateClipMovies () {
    try {
      await this.$store.dispatch('updateClipMoviesDB', { movies: this.newMovies })
    } catch (e) {
      console.log(e)
    } finally {
      this.closeModal()
    }
  }
}
</script>
