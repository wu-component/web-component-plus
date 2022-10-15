
/**
 * 判断是否是期望的类型
 * @param { unknown } param 将要判断的变量
 * @param { ...string } types 期望的类型
 * @return { boolean } 返回期望是否正确
 */
export const isExpectType = (param: unknown, ...types: string[]): boolean => {
    return types.some(type => Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type);
};

export const get = (data: object, strKeys: string) => {
    const keys = strKeys.split('.');
    for (const key of keys) {
        const res = data[key];
        if (!isExpectType(res, 'object', 'array')) return res;
        data = res;
    }
    return data;
};

export const has = (data: object, key: string | number): boolean => {
    return Object.prototype.hasOwnProperty.call(data, key);
};

export const hasProto = '__proto__' in {};

export function def (obj: object, key: string | number, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

export function parsePath (path: string) {
  path += '.';
  const segments: string[] = [];
  let segment = '';
  for (let i = 0; i < path.length; i++) {
    const curr = path[i];
    if (/\[|\./.test(curr)) {
      segments.push(segment);
      segment = '';
    } else if (/\W/.test(curr)) {
      continue;
    } else {
      segment += curr;
    }
  }
  return function (data: object | any[]) {
    return segments.reduce((data, key) => {
      return data[key];
    }, data);
  };
}

export function traverse (value: any) {
  // const seenObjects = new Set()
  const dfs = (data: any) => {
    if (!isExpectType(data, 'array', 'object')) return;
    Object.keys(data).forEach(key => {
      const value = data[key];
      dfs(value);
    });
  };
  dfs(value);
  // seenObjects.clear()
}
