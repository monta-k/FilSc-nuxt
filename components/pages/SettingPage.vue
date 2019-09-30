<template>
  <div style="padding-top:100px;">
    <setting-form :user="user" />

    <div class="mt-5">
      <hr class="w-100">
      <app-button :is-danger="true" @click="deleteUserModal = true">
        アカウントを削除する
      </app-button>
    </div>

    <modal-view v-if="deleteUserModal">
      <template slot="body">
        <div>
          <p class="h5">
            本当に削除しますか?
          </p>
        </div>
      </template>

      <template slot="footer">
        <div class="text-center">
          <app-button :is-danger="true" @click="deleteUser">
            削除する
          </app-button>
          <app-button @click="deleteUserModal = false">
            キャンセル
          </app-button>
        </div>
      </template>
    </modal-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import * as Vuex from 'vuex'
import SettingForm from '~/components/organisms/SettingForm.vue'
import AppButton from '~/components/atoms/AppButton.vue'
import ModalView from '~/components/atoms/ModalView.vue'

@Component({
  components: {
    SettingForm,
    AppButton,
    ModalView
  }
})
export default class extends Vue {
  $store!: Vuex.ExStore

  deleteUserModal: boolean = false

  get user () {
    return this.$store.getters['users/user']
  }

  async deleteUser () {
    try {
      await this.$store.dispatch('users/deleteUser')
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
