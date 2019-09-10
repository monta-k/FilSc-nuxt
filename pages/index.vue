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

<script>
import { mapGetters, mapActions } from 'vuex'
import UserForm from '~/components/UserForm'
import UserTop from '~/components/UserTop'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['isLoading', 'title', 'movies']),
    ...mapGetters('users', ['user'])
  },
  components: {
    UserForm,
    UserTop
  }
}
</script>