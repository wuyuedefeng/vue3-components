<template>
  <canvas ref="canvasRef" class="vc-signature-canvas" :class="{ disabled }"
          @mousedown.stop="touchstart($event)" @mousemove.stop="touchmove($event)" @mouseup.stop="touchend($event)" @mouseleave="touchend($event)"
          @touchstart.stop="touchstart($event)" @touchmove.stop="touchmove($event)" @touchend.stop="touchend($event)"
  >
  </canvas>
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'VcSignatureCanvas',
  props: {
    options: [Object],
    disabled: [Boolean],
  },
  emits: ['changeMoveCount'],
  expose: ['clear', 'toBase64Image'],
  setup (props, ctx) {
    const state = reactive<any>({
      finalOptions: computed(() => ({
        fillStyle: '#f2f2f2',
        strokeStyle: '#000',
        lineWidth: '1',
        ...props.options,
      })),
      canvasRef: null,
      drawing: false,
      moveCount: 0,
      touchstart (e: any) {
        state.drawing = true
        let rect = e.target.getBoundingClientRect()
        let cxt = state.canvasRef.getContext('2d')
        cxt.beginPath()
        cxt.strokeStyle = state.finalOptions.strokeStyle
        cxt.lineWidth = state.finalOptions.lineWidth
        let rectX = rect.x || rect.left
        let rectY = rect.y || rect.top
        let x = e.offsetX || (e.changedTouches[0].pageX - rectX)
        let y = e.offsetY || (e.changedTouches[0].pageY - rectY)
        cxt.moveTo(x, y)
      },
      touchmove (e: any) {
        if (this.drawing) {
          if (e.offsetX || e.changedTouches) {
            let rect = e.target.getBoundingClientRect()
            let rectX = rect.x || rect.left
            let rectY = rect.y || rect.top
            let cxt = state.canvasRef.getContext('2d')
            let x = e.offsetX || (e.offsetX === 0 ? e.offsetX : (e.changedTouches[0].pageX - rectX))
            let y = e.offsetY || (e.offsetY === 0 ? 0 : (e.changedTouches[0].pageY - rectY))
            cxt.lineTo(x, y)
            cxt.stroke()
            state.moveCount++
          }
        }
      },
      touchend () {
        this.drawing = false
        let cxt = state.canvasRef.getContext('2d')
        cxt.closePath()
        ctx.emit('changeMoveCount', state.moveCount)
      },
      clear () {
        let cxt = state.canvasRef.getContext('2d')
        cxt.fillStyle = state.finalOptions.fillStyle
        cxt.fillRect(0, 0, state.canvasRef.width, state.canvasRef.height)
        state.moveCount = 0
        ctx.emit('changeMoveCount', state.moveCount)
      },
      toBase64Image (type = 'image/png', quality?: any) {
        return state.canvasRef.toDataURL(type, quality)
      }
    })
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-signature-canvas {
  &.disabled {
    pointer-events: none;
  }
}
</style>