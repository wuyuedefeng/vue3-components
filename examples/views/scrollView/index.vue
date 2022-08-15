<template>
  <vc-scroll-view direction="vertical" dragScroll>
    <template v-for="i in 20" :key="i">
      <div class="item">{{i}}</div>
    </template>
  </vc-scroll-view>
  <vc-scroll-view direction="horizontal" dragScroll>
    <template v-for="i in 20" :key="i">
      <div class="item">{{i}}</div>
    </template>
  </vc-scroll-view>
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
  },
  setup (props, ctx) {
    const state = reactive<any>({})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-scroll-view {
  height: 200px;
  border: 1px solid #ccc;

  &.horizontal {
    .item {
      display: inline-block;
      flex-shrink: 0;
    }
  }

  .item {
    width: 100px;
    height: 100px;
    &:odd {
      background: #f2f2f2;
    }
  }
}
</style>