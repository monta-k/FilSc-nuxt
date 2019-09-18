<template>
  <button class="app-button" :disabled="disabled" @click="callback($event)">
    <slot />
  </button>
</template>

<script lang="ts">
import { Prop, Vue } from 'nuxt-property-decorator'

export default class extends Vue {
  @Prop() disabled: Boolean = false

  callback(e :Event): void {
    this.$emit('click', e)
  }
}
</script>

<style lang="scss" scoped>
.app-button {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.25);
  background: #0086cc;
  border-radius: 18px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  outline: none;
  padding: 0 15px;
  margin: 1.5px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 400ms ease;
  min-width: 200px;
  &:hover,
  &:focus {
    background: #006ca4;
  }
  &:active {
    box-shadow: none;
  }
}
</style>