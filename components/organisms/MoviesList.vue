<template>
  <div class="row mt-3">
    <div class="col-12">
      <input type="checkbox" value="true" id="lengthToggle" v-model="hideUndecidedLength">
      <label class="mr-2 align-middle" for="lengthToggle">
        -分を隠す
      </label>
      <input type="number" v-model="narrowLengthStart" min="0" max="999"><p class="d-inline-block align-middle">分</p>
      <p class="d-inline-block align-middle">〜</p>
      <input type="number" v-model="narrowLengthEnd" min="0" max="999"><p class="d-inline-block align-middle">分</p>
    </div>
    <movie-content class="col-md-4 col-12 mt-3" v-for="(movie, index) in narrowedMovies" :key="index" :movie="movie"></movie-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MovieContent from '~/components/molecules/MovieContent.vue'
import * as Vuex from 'vuex'

@Component({
  components: {
    MovieContent
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  hideUndecidedLength: boolean = false
  narrowLengthStart: number = 0
  narrowLengthEnd: number = 999

  mounted() {
    this.$store.dispatch('fetchUserMovies')
  }

  get movies() {
    return this.$store.getters['movies']
  }

  get narrowedMovies() {
    if (this.hideUndecidedLength) {
      return this.movies.filter(movie => movie.length >= this.narrowLengthStart && movie.length <= this.narrowLengthEnd && movie.length !== 0)
    } else {
      return this.movies.filter(movie => movie.length >= this.narrowLengthStart && movie.length <= this.narrowLengthEnd)
    }
  }
}
</script>

<style scoped>
input[type="number"] {
  border: none;
  border-bottom: 2px solid #eee;
}
</style>