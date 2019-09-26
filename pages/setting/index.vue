<template>
  <setting-page />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SettingPage from '~/components/pages/SettingPage.vue'

@Component({
  components: {
    SettingPage
  }
})
export default class extends Vue {

}
</script>
