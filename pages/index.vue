<template>
  <div class="container">
    <h1>FilSc</h1>
    <h3 v-if="isLoading">読み込み中</h3>
    <button @click="fetchData">fetch</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoading', 'title', 'movies'])
  },
  methods: {
    ...mapActions(['loading', 'notLoading', 'fetchData'])
  }
}
</script>