<template>
  <div class="mt-3">
    <template v-if="user && user.filmarks_id">
      <div>
        idあり
      </div>
    </template>
    <template v-else>
      <user-form></user-form>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserForm from '~/components/UserForm'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['isLoading', 'title', 'movies']),
    ...mapGetters('users', ['user'])
  },
  components: {
    UserForm
  }
}
</script>