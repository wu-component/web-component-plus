export const addDragListener = (
  target: HTMLElement,
  callback: (event: MouseEvent) => void,
  onDragStart?: (event: MouseEvent) => void,
  onDragEnd?: (event: MouseEvent) => void
) => {
  let lock = false
  const cancel = (event: MouseEvent) => {
    lock = false
    onDragEnd && onDragEnd(event)
    document.onmousemove = null
    document.onmouseup = null
  }
  target.onmousedown = event => {
    lock = true
    onDragStart && onDragStart(event)
    document.onmousemove = event => lock && callback(event)
    document.onmouseup = cancel
  }
  target.onmouseup = cancel
}
