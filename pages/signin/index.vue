<template>
  <signin-page></signin-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SigninPage from '~/components/pages/SigninPage.vue'

@Component({
  components: {
    SigninPage
  }
})
export default class extends Vue {
}
</script>