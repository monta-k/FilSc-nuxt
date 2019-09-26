<template>
  <div>
    <div class="all-wrapper">
      <div class="dropdown-wrapper" @click="isActive = !isActive">
        <div class="btn dropdown-text">
          {{ label }}
        </div>
        <i class="el-icon-caret-bottom" />
      </div>
      <transition>
        <div v-if="isActive" class="list-items">
          <template v-if="existsListItems">
            <template v-for="(value, key) in listItems">
              <div :key="key" class="list-item" @click="handleClickItem(key)">
                {{ value }}
              </div>
            </template>
          </template>
          <template v-else>
            <div class="list-item">
              選択肢がありません
            </div>
          </template>
        </div>
      </transition>
    </div>
    <div v-if="isActive" class="dropdown-bg" @click="isActive = false" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AppDropdown extends Vue {
  @Prop() label?: string
  @Prop() listItems?: Object
  @Prop() action?: Function

  isActive: boolean = false

  get existsListItems () {
    if (this.listItems) {
      return !!Object.keys(this.listItems).length
    }
  }

  handleClickItem (key: number) {
    if (this.action) {
      this.action(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-bg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

.all-wrapper {
  position: relative;
  .dropdown-wrapper {
    color: #666666;
    display: flex;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
    .dropdown-text {
        font-size: 14px;
    }
    i {
        font-size: 10px;
        margin-left: 6px;
    }
  }
  .list-items {
    text-align: center;
    width: 150px;
    max-height: 300px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #B9BFC9;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    position: absolute;
    right: 0;
    overflow-y: scroll;
    z-index: 3;
    padding: 0.5rem 0;
    .list-item {
      color: #333;
      font-size: 14px;
      line-height: 16px;
      padding: 0.75rem 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      &:not(.active):hover {
          background-color: #F3F4F6;
          cursor: pointer;
      }
      &.active {
          color: #fff;
          background-color: #182A4B;
      }
    }
  }
}
</style>
