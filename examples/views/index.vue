<template>
  <div class="layout">
    <div class="left-layout">
      <ul>
        <li @click="$router.push({name: 'home'})">home</li>
        <li @click="$router.push({name: 'scrollView'})">scrollView</li>
        <li @click="$router.push({name: 'autoFontSizeView'})">autoFontSizeView</li>
        <li @click="$router.push({name: 'signatureCanvas'})">signatureCanvas</li>
      </ul>
    </div>
    <div class="right-layout">
      <router-view></router-view>
    </div>
  </div>
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