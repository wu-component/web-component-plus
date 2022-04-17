import { track, trigger } from './effect'

function get(target: object, key: string | symbol, receiver: object) {
  const res = Reflect.get(target, key, receiver)
  track(target, key)

  if (res && typeof res === 'object') {
    // deep reactive
    return reactive(res)
  }

  return res
}

function set(target: object, key: string | symbol, value: unknown, receiver: object) {
  const res = Reflect.set(target, key, value, receiver)
  trigger(target, key)

  return res
}

const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
}

export function reactive<T extends object>(target: T) {
  return new Proxy<T>(target, mutableHandlers)
}
