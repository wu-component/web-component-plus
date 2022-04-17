let activeEffect: ReactiveEffect | undefined;

export type Dep = Set<ReactiveEffect>

const targetsMap = new WeakMap<any, Map<string | symbol, Dep>>();

export class ReactiveEffect<T = any> {
  public deps: Dep[] = []

  constructor(public fn: () => T) {}

  run() {
    activeEffect = this;
    return this.fn();
  }
}

export function effect<T = any>(fn: (...args: any) => T) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
    return _effect.run.bind(_effect);
}

export function track(target: object, key: string | symbol) {
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    targetsMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  if (activeEffect) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger(target: object, key: string | symbol) {
  const depsMap = targetsMap.get(target);
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      triggerEffect(dep);
    }
  }
}

export function triggerEffect(dep: Dep | ReactiveEffect[]) {
  // @ts-ignore
    for (const effect of Array.isArray(dep) ? dep : [ ...dep ]) {
    effect.run();
  }
}
