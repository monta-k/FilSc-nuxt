<template>
  <div class="signup-card">
    <signup-form></signup-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SignupForm from '~/components/molecules/SignupForm.vue'

@Component({
  components: {
    SignupForm
  }
})

export default class extends Vue {
}
</script>

<style scoped>
.signup-card {
  padding: 30px 10px;
  border: solid 0.2px gray;
  border-radius: 10px;
  background-color: #eee;
  margin-top: 100px;
}

@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
    margin: auto;
  }
}
</style>