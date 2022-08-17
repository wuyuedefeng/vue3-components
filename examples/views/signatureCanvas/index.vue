<template>
  <vc-signature-canvas ref="signatureCanvasRef"></vc-signature-canvas>
  <button @click="clear">清除</button>
  <button @click="preview">预览</button>
  <button @click="download">下载</button>
  <div v-if="previewData">
    <h3>预览</h3>
    <img :src="previewData" alt="">
  </div>
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs } from 'vue'
import * as file from '../../../packages/libs/file'

export default defineComponent({
  props: {
  },
  setup (props, ctx) {
    const state = reactive<any>({
      signatureCanvasRef: null,
      previewData: null,
      clear() {
        state.signatureCanvasRef.clear()
        state.previewData = null
      },
      preview() {
        state.previewData = state.signatureCanvasRef.toBase64Image()
      },
      download() {
        const base64 = state.signatureCanvasRef.toBase64Image()
        file.downloadBase64(base64, 'hello')
      }
    })
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-signature-canvas {
  border: 1px solid black;
}
</style>