<template>
  <top-page />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TopPage from '~/components/pages/TopPage.vue'

@Component({
  components: {
    TopPage
  }
})

export default class extends Vue {
}
</script>
