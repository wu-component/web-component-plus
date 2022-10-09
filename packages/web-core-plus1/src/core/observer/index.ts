import Dep from './dep';
import { hasProto, def } from './utils';
import { newArrayProto } from './array';

export default class Observer {
  value: any
  dep: Dep

  /**
   * 观察者构造器
   * @param value
   */
  constructor (value: any) {
    // this.value = value
    this.dep = new Dep();
    // 将响应式对象代理到当前value上面, 并且将当前的enumerable设置为false
    def(value, '__observer__', this);
    if (Array.isArray(value)) { // 如果是数组, 则重写原型方法
      if (hasProto) {
        value['__proto__'] = newArrayProto;
      } else {
        Object.getOwnPropertyNames(newArrayProto).forEach(key => {
          def(value, key, newArrayProto[key]);
        });
      }
    }
    this.walk(value);
  }

  walk (data: object | any[]) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }
}

/**
 * 处理响应式
 * @param { Object | Array } data
 */
export function observe (data: any): Observer | void {
  if (!data || typeof data !== 'object') return;
  let luckyOb: Observer | void;
  if ('__observer__' in data) {
    luckyOb = data['__observer__'];
  } else {
    luckyOb = new Observer(data);
  }
  return luckyOb;
}

/**
 * 重写 setter / getter
 * @param {*} data
 * @param {*} key
 * @param {*} val
 */
export function defineReactive (data: any, key: string | number, val: any) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(data, key);
  if (property && property.configurable === false) {
    return;
  }
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = data[key];
  }
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      const value = getter ? getter.call(data) : val;
      /*const ob = this.__observer__;
      ob?.dep?.depend();*/
      if (Dep.target) {
          dep.addSub(Dep.target);
          if (childOb) {
              childOb.dep.addSub(Dep.target);
          }
      }
      return value;
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      // observe(newVal);
      // const ob = this.__observer__;
      // ob?.dep?.notify();
      if (getter && !setter) return;
      if (setter) {
          setter.call(data, newVal);
      } else {
          val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}
