<template>
  <top-page></top-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TopPage from '~/components/pages/TopPage.vue'
import * as Vuex from 'vuex'

@Component({
  components: {
    TopPage
  }
})

export default class extends Vue {
}
</script>