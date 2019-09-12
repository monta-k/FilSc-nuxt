<template>
  <div class="row">
    <movie-content class="col-md-4 col-12 mt-2" v-for="(movie, index) in movies" :key="index" :movie="movie"></movie-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieContent from '~/components/MovieContent'

export default {
  computed: {
    ...mapGetters(['movies'])
  },
  components: {
    MovieContent
  }
}
</script>