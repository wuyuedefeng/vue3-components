<template>
  <div ref="scrollElRef" class="vc-scroll-view" :class="{[direction]: direction}" v-drag-scroll="{enabled: dragScroll, [direction]: true}">
    <slot></slot>
  </div>
</template>

<script lang='tsx'>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import dragScroll from '../../directives/dragScroll'

export default defineComponent({
  name: 'VcScrollView',
  directives: {
    dragScroll
  },
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: (val: string) => ['vertical', 'horizontal'].indexOf(val) !== -1
    },
    dragScroll: [Boolean]
  },
  emits: ['scrollEnd'],
  setup (props, ctx) {
    const state = reactive<any>({
      scrollElRef: null,
      onScrollElWheel: (event: any) => {
        if (!event.deltaX) {
          event.preventDefault()
          if (props.direction === 'horizontal') {
            state.scrollElRef.scrollBy({
              left: event.deltaY * 2,
            })
          } else if (props.direction === 'vertical') {
            state.scrollElRef.scrollBy({
              top: event.deltaY * 2,
            })
          }
        }
      },
      onScroll: (event: any) => {
        const el = event.target
        // console.log(event, el.scrollLeft, el.clientWidth, el.scrollWidth)
        if (
          props.direction === 'horizontal' && el.scrollLeft + el.clientWidth === el.scrollWidth ||
          props.direction === 'vertical' && el.scrollTop + el.clientHeight === el.scrollHeight
        ) {
          ctx.emit('scrollEnd', event)
        }
      }
    })

    onMounted(() => {
      state.scrollElRef.addEventListener('wheel', state.onScrollElWheel)
      state.scrollElRef.addEventListener('scroll', state.onScroll)
    })
    onBeforeUnmount(() => {
      state.scrollElRef.removeEventListener('wheel', state.onScrollElWheel)
      state.scrollElRef.removeEventListener('scroll', state.onScroll)
    })

    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.vc-scroll-view {
  max-height: 100%;
  overflow: hidden;

  &.horizontal {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  &.vertical {
    overflow-y: auto;
  }
}
</style>