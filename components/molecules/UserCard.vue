<template>
  <div class="row ">
    <div class="col-4">
      <img :src="filmarksProfile.profileImage" alt="カバー画像">
    </div>
    <div class="col-8">
      <h5 class="h5">
        {{ filmarksProfile.profileName }}
      </h5>
      <h5 class="h5 mb-3">
        {{ filmarksProfile.profileId }}
      </h5>
      <a class="text-dark" :href="filmarksProfile.url" target="_blank" rel="noopener" style="text-decoration:none;">Filmarksページへ</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import AppButton from '~/components/atoms/AppButton.vue'

export interface FilmarksProfile {
  url: string
  profileImage: string
  profileName: string
  profileId: string
}

@Component({
  components: {
    AppButton
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  @Prop() filmarksProfile!: FilmarksProfile
}
</script>
