<template>
  <div class="mt-3">
    <swiper :options="swiperOption">
      <swiper-slide v-for="movie in popularMovies" :key="movie.id">
        <img class="movie-image" :src="movie.image">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore

  swiperOption: Object = {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  }

  get popularMovies() {
    return this.$store.getters['popularMovies']
  }

  mounted() {
    this.$store.dispatch('setPopularMovies')
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .movie-image {
    width: 150px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
}
@media screen and (max-width: 767px) {
  .movie-image {
    width: 90px;
  }
  p {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
}
</style>