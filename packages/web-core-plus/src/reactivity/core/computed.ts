import { ReactiveEffect } from './effect';

class Computed<T> {
    private _value!: T;
    public readonly effect: ReactiveEffect<T>;

    constructor(fn: () => T, private readonly _setter: (v: T) => void) {
        this.effect = new ReactiveEffect(fn);
    }

    get value() {
        this._value = this.effect.run();
        return this._value;
    }

    set value(v) {
        this._setter(v);
    }
}

export function computed<T>(fn: () => T) {
    return new Computed(fn, () => {});
}
