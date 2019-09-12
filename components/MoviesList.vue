<template>
  <div class="row">
    <div class="col-12">
      <input type="checkbox" value="true" id="lengthToggle" v-model="hideUndecidedLength">
      <label for="lengthToggle">
        上映時間未定を隠す
      </label>
    </div>
    <movie-content class="col-md-4 col-12 mt-2" v-for="(movie, index) in narrowedMovies" :key="index" :movie="movie"></movie-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieContent from '~/components/MovieContent'

export default {
  data() {
    return {
      hideUndecidedLength: false
    }
  },
  computed: {
    narrowedMovies() {
      if (this.hideUndecidedLength) {
        return this.movies.filter(movie => movie.length !== 0)
      } else {
        return this.movies
      }
    },
    ...mapGetters(['movies'])
  },
  components: {
    MovieContent
  }
}
</script>