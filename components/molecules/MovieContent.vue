<template>
  <a class="text-dark text-center pr-1 pl-1" :href="movie.link" target='_blank' style="text-decoration:none;">
    <div class="movie-card row">
      <div class="col-12">
        <img :src="movie.image" alt="" class="movie-image mb-2">
        <p class="font-weight-bold mb-1">{{ movie.title }}</p>
        <p>上映時間: {{ movie.length | movieLength }}分</p>
        <star-rating v-model="scoreNumber" :increment="0.1" :star-size="starSize" :read-only="true" :show-rating="false" :inline="true"></star-rating>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Movie } from '~/store/type'
import StarRating from 'vue-star-rating'

@Component({
  components: {
    StarRating: StarRating
  },
  filters: {
    movieLength: function (length: number): string | number {
      return length === 0 ? '-' : length
    }
  }
})

export default class extends Vue {
  @Prop() movie!: Movie

  get starSize(): number {
    if (window.parent.screen.width >= 768) {
      return 20
    } else {
      return 15
    }
  }

  get scoreNumber(): number {
    return Number(this.movie.score)
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  padding: 5px;
  margin: 0 1px;
  border-radius: 5px;
  box-shadow: 0 0 16px 0 rgba(192, 192, 192, 0.7);
  transition: box-shadow 400ms ease;

  &:hover {
    box-shadow: 0 0 16px 0 rgba(0, 134, 204, 0.5);

    &:active {
      box-shadow: 0 0 2px 0 rgba(0, 134, 204, 0.5);
    }
  }
}

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