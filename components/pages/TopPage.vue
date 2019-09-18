<template>
  <div class="mt-3">
    <template v-if="user && user.filmarks_id">
      <user-top></user-top>
    </template>
    <template v-else>
      <user-form></user-form>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserForm from '~/components/organisms/UserForm.vue'
import UserTop from '~/components/organisms/UserTop.vue'
import * as Vuex from 'vuex'

@Component({
  components: {
    UserForm,
    UserTop
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  get isLoading() {
    return this.$store.getters['isLoading']
  }
  get movies() {
    return this.$store.getters['movies']
  }
  get user() {
    return this.$store.getters['users/user']
  }
}
</script>