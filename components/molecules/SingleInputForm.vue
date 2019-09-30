<template>
  <div class="mb-5">
    <div class="form-group text-left md-w50">
      <label class="h5">{{ title }}</label>
      <input :value="value" type="text" class="form-control" @input="updateContent($event.target.value)">
    </div>
    <div>
      <p class="text-danger">
        {{ errorMessage }}
      </p>
      <p class="text-success">
        {{ successMessage }}
      </p>
      <app-button @click="callback($event)">
        {{ buttonName }}
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import AppButton from '~/components/atoms/AppButton.vue'

@Component({
  components: {
    AppButton
  }
})
export default class SingleInputForm extends Vue {
  @Prop() title!: string
  @Prop() value!: string
  @Prop() buttonName!: string

  successMessage: string | null = null
  errorMessage: string | null = null

  updateContent (content: string) {
    this.$emit('input', content)
  }
  clearMessage () {
    this.successMessage = null
    this.errorMessage = null
  }
  setSuccessMessage (message: string) {
    this.successMessage = message
  }
  setErrorMessage (message: string) {
    this.errorMessage = message
  }
  callback (e :Event): void {
    this.clearMessage()
    this.$emit('click', e)
  }
}
</script>

<style scoped>
@media screen and (min-width: 767px) {
  .md-w50 {
    width: 50%;
  }
}
</style>
