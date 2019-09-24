<template>
  <div class="mt-3" style="margin-bottom:30px">
    <template v-if="user && user.filmarksId">
      <user-top />
    </template>
    <template v-else>
      <user-form />
    </template>
    <transition>
      <div v-show="scY > 300" id="topbutton" @click="toTop">
        トップへ戻る
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import UserForm from '~/components/organisms/UserForm.vue'
import UserTop from '~/components/organisms/UserTop.vue'

@Component({
  components: {
    UserForm,
    UserTop
  }
})

export default class extends Vue {
  $store!: Vuex.ExStore

  scY: number = 0

  get isLoading () {
    return this.$store.getters.isLoading
  }
  get movies () {
    return this.$store.getters.movies
  }
  get user () {
    return this.$store.getters['users/user']
  }

  created () {
    window.addEventListener('scroll', this.scEvent)
  }

  toTop () {
    const scrolled = window.pageYOffset
    window.scrollTo(0, Math.floor(scrolled * 0.8))
    if (scrolled > 0) {
      window.setTimeout(this.toTop, 10)
    }
  }
  scEvent () {
    this.scY = window.scrollY
  }
}
</script>

<style lang="scss" scoped>
#topbutton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;

  //出現動作に関係するのは此処より下
  transition: all 0.6s;
  &.v-enter,
  &.v-leave-to {
    opacity: 0;
    bottom: 10px;
  }
}
</style>
