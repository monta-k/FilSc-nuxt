<template>
  <div class="row ">
    <div class="col-4">
      <img :src="filmarks_profile.profile_image" alt="カバー画像">
    </div>
    <div class="col-8">
      <h5 class="h5">{{ filmarks_profile.profile_name }}</h5>
      <h5 class="h5">{{ filmarks_profile.profile_id }}</h5>
      <a class="text-dark d-block mt-3" :href="filmarks_profile.url" target="_blank" rel="noopener" style="text-decoration:none;">Filmarksページへ</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import AppButton from '~/components/atoms/AppButton.vue'
import UserCard from '~/components/molecules/UserCard.vue'
import * as Vuex from 'vuex'
import { Movie } from '~/store/type'

export interface FilmarksProfile {
  url: string
  profile_image: string
  profile_name: string
  profile_id: string
}

@Component({
  components: {
    AppButton,
    UserCard
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  @Prop() filmarks_profile!: FilmarksProfile
}
</script>