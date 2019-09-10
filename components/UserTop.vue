<template>
  <div>
    <div class="row">
      <div class="col-4">
        <img :src="filmarks_profile.profile_image" alt="カバー画像">
      </div>
      <div class="col-8">
        <h5 class="h5">{{ filmarks_profile.profile_name }}</h5>
        <h5 class="h5">{{ filmarks_profile.profile_id }}</h5>
      </div>
      <div class="col-12">
        <a :href="filmarks_profile.url">Filmarksのページへ</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      filmarks_profile: {
        url: '',
        profile_image: '',
        profile_name: '',
        profile_id: '',
      }
    }
  },
  async mounted() {
    try {
      this.loading()
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/find_user`, { params: { searchId: this.user.filmarks_id } })
      this.filmarks_profile = data
    } catch (e) {
      console.log(e)
    } finally {
      this.notLoading()
    }
  },
  computed: {
    ...mapGetters('users', ['user'])
  },
  methods: {
    ...mapActions(['loading', 'notLoading'])
  }
}
</script>