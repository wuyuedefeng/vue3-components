export default (scrollContainerEl: HTMLElement, binding: any) => {
  const options = Object.assign({
    enabled: true,
    horizontal: false,
    vertical: false,
  }, binding.value)
  const onMouseDown = (event: any) => {
    if (!options.enabled) { return }
    // 按下了command键或者ctrl键 并且按下了鼠标左键(0:左 1:滚轮 2:右键)
    const checkKey = (event.metaKey || event.ctrlKey) && !event.button
    if (!checkKey) { return }

    const { clientX, clientY, pageX, pageY } = event
    const x1 = clientX || pageX
    const y1 = clientY || pageY
    const maxScrollLeft = options.horizontal ? scrollContainerEl.scrollWidth - scrollContainerEl.clientWidth : 0
    const maxScrollTop = options.vertical ? scrollContainerEl.scrollHeight - scrollContainerEl.clientHeight : 0
    const mouseDownScrollLeft = scrollContainerEl.scrollLeft
    const mouseDownScrollTop = scrollContainerEl.scrollTop

    const onMouseMove = (event: any) => {
      event.preventDefault()
      const { clientX, clientY, pageX, pageY } = event
      const x2 = clientX || pageX
      const y2 = clientY || pageY

      const offsetX = x2 - x1
      const offsetY = y2 - y1
      const calcScrollLeft = mouseDownScrollLeft - offsetX
      const calcScrollTop = mouseDownScrollTop - offsetY

      scrollContainerEl.scrollTo(
        Math.max(0, Math.min(maxScrollLeft, calcScrollLeft)),
        Math.max(0, Math.min(maxScrollTop, calcScrollTop))
      )
    }
    document.addEventListener('mousemove', onMouseMove, { capture: true })
    // 拖拽禁止click
    const onClick = (event: any) => {
      event.stopPropagation()
      document.removeEventListener('click', onClick, { capture: true })
    }
    document.addEventListener('click', onClick, { capture: true })

    const onMouseUp = (_event: any) => {
      document.removeEventListener('mousemove', onMouseMove, { capture: true })
      document.removeEventListener('mouseup', onMouseUp, { capture: true })
    }
    document.addEventListener('mouseup', onMouseUp, { capture: true })
  }
  scrollContainerEl.addEventListener('mousedown', onMouseDown)
}