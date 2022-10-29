export const debounce = (callback: Function, delta = 500, id = "default") => {
  clearTimeout(debounce[id])
  debounce[id] = setTimeout(callback, delta)
}
