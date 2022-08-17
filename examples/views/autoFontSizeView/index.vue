<template>
  <vc-auto-font-size-view :content="content"></vc-auto-font-size-view>
  <input v-model="content" type="text" placeholder="请输入内容">
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
  },
  setup (props, ctx) {
    const state = reactive<any>({
      content: 'hello world'
    })
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-auto-font-size-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  background: #f2f2f2;
}
</style>