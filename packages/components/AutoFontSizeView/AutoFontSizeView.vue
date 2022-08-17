<template>
  <div ref="viewRef" class="vc-auto-font-size-view">
    {{ content }}
  </div>
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'VcAutoFontSizeView',
  props: {
    content: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: Number,
      default: 0
    },
    allowFontSizeRange: {
      type: Array,
      default: () => [12, 100]
    }
  },
  emits: ['scrollEnd'],
  setup (props, ctx) {
    const state = reactive<any>({
      viewRef: null,
      getFontSize(width: number, fontStyle: '', fontFamily = '') {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) { return }
        const [minFontSize = 12, maxFontSize = 100] = props.allowFontSizeRange
        let fontSize = maxFontSize as number;
        while (true) {
          context.font = `${fontStyle} ${fontSize}px ${fontFamily}`
          const measure = context.measureText(props.content)
          // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#measuring_text_width
          // const measureWidth = measure.width
          const measureWidth = Math.max(measure.width, measure.actualBoundingBoxRight + measure.actualBoundingBoxLeft)
          if (measureWidth > Math.max(width, props.maxWidth) && fontSize > (minFontSize as number)) {
            fontSize--
          } else {
            break
          }
        }
        return fontSize
      }
    })

    onMounted(() => {
      watch(() => props.content, nv => {
        if (nv) {
          const computedStyle = getComputedStyle(state.viewRef)
          const width = parseInt(computedStyle.width)
          // const height = parseInt(computedStyle.height)
          const fontStyle = computedStyle.fontStyle
          const fontFamily = computedStyle.fontFamily
          const fontSize = state.getFontSize(width, fontStyle, fontFamily)
          state.viewRef.style.fontSize = `${fontSize}px`
        }
      }, {immediate: true})
    })
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-auto-font-size-view {
}
</style>