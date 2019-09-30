<template>
  <div class="row mt-2 mb-3">
    <div class="col-12" :class="{ 'is-fixed': isFixed }" style="background-color: white; height:75px;">
      <div class="row">
        <div class="col-12">
          <h4 class="h4 text-center">
            Clipした映画
          </h4>
        </div>
        <div class="col-5 col-md-2">
          <input id="lengthToggle" v-model="hideUndecidedLength" type="checkbox" value="true">
          <label class="mr-2 align-middle" for="lengthToggle">
            -分を隠す
          </label>
        </div>
        <div class="col-7 col-md-10">
          <vue-slider v-model="narrowLength" :min="0" :max="500" :marks="marks" :width="150" />
        </div>
      </div>
    </div>
    <movie-content v-for="(movie, index) in narrowedMovies" :key="index" class="col-md-3 col-6 mt-3" :movie="movie" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import VueSlider from 'vue-slider-component'
import MovieContent from '~/components/molecules/MovieContent.vue'
import 'vue-slider-component/theme/default.css'

@Component({
  components: {
    MovieContent,
    VueSlider
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  hideUndecidedLength: boolean = false
  narrowLength: Array<number> = [0, 500]
  isFixed: boolean = false
  marks = (val: number) => val % 500 === 0 ? ({
    label: `${val}分`,
    labelStyle: {
      opacity: 1
    },
    labelActiveStyle: {
      color: '#3498db'
    }
  }) : false

  mounted () {
    this.$store.dispatch('fetchUserMovies')
    window.addEventListener('scroll', this.handleScroll)
  }
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  get movies () {
    return this.$store.getters.movies
  }

  get narrowedMovies () {
    if (this.hideUndecidedLength) {
      return this.movies.filter(movie => movie.length >= this.narrowLength[0] && movie.length <= this.narrowLength[1] && movie.length !== 0)
    } else {
      return this.movies.filter(movie => movie.length >= this.narrowLength[0] && movie.length <= this.narrowLength[1])
    }
  }

  handleScroll () {
    this.isFixed = window.scrollY >= 325
  }
}
</script>

<style lang="scss" scoped>
input[type="number"] {
  border: none;
  border-bottom: 2px solid #eee;
}

@mixin fixed() {
  box-shadow: 0 0 16px 0 rgba(192, 192, 192, 0.7);
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

@media (min-width: 1200px) {
  .is-fixed {
    @include fixed();
    max-width: 1140px;
    width: 100%;
    margin: auto;
    padding: 0 15px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .is-fixed {
    @include fixed();
    max-width: 960px;
    width: 100%;
    margin: auto;
    padding: 0 15px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .is-fixed {
      @include fixed();
      max-width: 720px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .is-fixed {
      @include fixed();
      max-width: 540px;
      width: 100%;
      margin: auto;
      padding: 0 15px;
  }
}
@media (max-width: 575px) {
  .is-fixed {
      @include fixed();
      width: 100%;
      margin: auto;
  }
}
</style>
