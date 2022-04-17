import { reactive } from '.';

export class Ref<T = any> {
  private _value: { value: T }

  constructor(value: T) {
    this._value = reactive<{ value: T }>({
      value,
    });
  }

  get value() {
    return this._value.value;
  }

  set value(v) {
    this._value.value = v;
  }
}

export function ref<T = any>(value: T) {
  return new Ref(value);
}
