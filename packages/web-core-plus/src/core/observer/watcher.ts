import Dep from './dep';
import { parsePath, traverse } from './utils';

export interface WatchOptType {
  handler?: () => Function
  immediate?: boolean
  deep?: boolean
}

let uid = 0;
export default class Watcher {
  id: number
  $vm: any
  expr: string | Function
  cb: Function
  deep: boolean
  getter: Function
  value: any

  timerFunc
  callbacks = []

  /**
   * 观察者构造器
   * @param {*} $vm
   * @param {*} expr
   * @param {*} cb
   * @param options
   * @param vm
   */
  constructor ($vm: any, expr: string | Function, cb: Function, options: WatchOptType = {}) {
    this.id = uid++;
    this.$vm = $vm;
    this.expr = expr;
    this.deep = !!options.deep;
    if (typeof expr === 'function') {
      this.getter = expr;
    } else {
      this.getter = parsePath(expr);
    }
    this.cb = cb;
    this.value = this.get();

    if (typeof Promise !== 'undefined') {
        const p = Promise.resolve();
        this.timerFunc = () => {
            p.then(this.flushCallbacks);
        };
    }
  }

  /**
   * 根据表达式获取新值
   */
  get () {
    Dep.target = this;
    const value = this.getter.call(this.$vm, this.$vm);
    // 处理深度监听
    if (this.deep) {
      traverse(value);
    }
    Dep.target = null;
    return value;
  }

  /**
   * 触发 watcher 更新
   */
  update () {
    // queueWatcher(this);
    // get获取新值
    const newVal = this.get();
    // 读取之前存储的旧值
    const oldVal = this.value;
    this.value = newVal;
    // 触发 watch 回调
    this.cb.call(this.$vm, newVal, oldVal);
  }

  run() {
      console.log("update");
  }

  flushCallbacks() {
      for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i]();
      }
      this.callbacks = [];
  }
}
