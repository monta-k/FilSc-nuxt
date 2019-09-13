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

<script>
import { mapGetters, mapActions } from 'vuex'
import MovieContent from '~/components/MovieContent'

export default {
  data() {
    return {
      hideUndecidedLength: false,
      narrowLengthStart: 0,
      narrowLengthEnd: 999
    }
  },
  mounted() {
    this.fetchUserMovies()
  },
  computed: {
    narrowedMovies() {
      if (this.hideUndecidedLength) {
        return this.movies.filter(movie => movie.length >= this.narrowLengthStart && movie.length <= this.narrowLengthEnd && movie.length !== 0)
      } else {
        return this.movies.filter(movie => movie.length >= this.narrowLengthStart && movie.length <= this.narrowLengthEnd)
      }
    },
    ...mapGetters(['movies'])
  },
  methods: {
  ...mapActions(['fetchUserMovies'])    
  },
  components: {
    MovieContent
  }
}
</script>

<style scoped>
input[type="number"] {
  border: none;
  border-bottom: 2px solid #eee;
}
</style>