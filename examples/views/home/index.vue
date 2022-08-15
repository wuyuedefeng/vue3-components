<template>
  home
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
</style>