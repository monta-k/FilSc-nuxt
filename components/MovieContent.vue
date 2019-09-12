<template>
  <a class="text-dark" :href="movie.link" target='_blank'>
    <div class="row">
      <div class="col-4">
        <img :src="movie.image" alt="" style="max-width: 90px;">
      </div>
      <div class="col-8">
        <p>{{ movie.title }}</p>
        <p>上映時間: {{ movie.length | movieLength }}分</p>
        <p>評価{{ movie.score }}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  filters: {
    movieLength: function (length) {
      return length === 0 ? '-' : length
    },
  }
}
</script>