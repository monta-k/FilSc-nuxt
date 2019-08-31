<template>
  <div class="container">
    <h1 class="h1">FilSc</h1>
    <h4 class="h4" v-if="isLoading">読み込み中</h4>
    <form @submit.prevent="search()">
      <input class="border mb-1" type="text" v-model="serchWord" style="height: 35px;">
      <button class="btn btn-outline btn-dark" type="submit">チェックした映画を尺順に取り出す</button>
    </form>
    <div v-if="hasError">
      <h3 class="h3">えら〜(ユーザー名が間違ってるかも)</h3>
    </div>
    <div class="mt-2">
      <h3 class="h3">{{ title }}</h3>
      <div class="row">
        <div class="col-md-4 col-12 mt-2" v-for="(movie, index) in movies" :key="index">
          <a class="text-dark" :href="movie[4]" target='_blank'>
            <div class="row">
              <div class="col-4">
                <img :src="movie[3]" alt="" style="max-width: 90px;">
              </div>
              <div class="col-8">
                <p>{{ movie[0] }}</p>
                <p>上映時間: {{ movie | movieLength }}分</p>
                <p>評価{{ movie[2] }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      serchWord: '',
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'title', 'movies', 'hasError'])
  },
  filters: {
    movieLength: function (movie) {
      return movie[1] === 0 ? '-' : movie[1]
    },
  },
  methods: {
    search() {
      this.resetError()
      this.fetchData(this.serchWord)
    },
    ...mapActions(['loading', 'notLoading', 'fetchData', 'resetError'])
  }
}
</script>