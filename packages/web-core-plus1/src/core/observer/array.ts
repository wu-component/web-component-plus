/**
 * 重写数组的原型方法
 */
const oldArrayProto = Array.prototype;
const newArrayProto = Object.create(oldArrayProto);
const methods = [ 'push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse' ];
methods.forEach(method => {
  newArrayProto[method] = function (...args: any[]) {
    const res = oldArrayProto[method].apply(this, args);
    const observer = this['__observer__'];
    if ([ 'push', 'unshift', 'splice' ].includes(method)) observer.walk(this);
      observer.dep.notify();
    return res;
  };
});

export { newArrayProto };
