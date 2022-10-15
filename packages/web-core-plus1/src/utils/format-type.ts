import { PropTyp } from '../declarations';

/**
 * 格式化数据类型
 */

export function formatValue(val: any, type?: PropTyp, defaultValue?: any) {
    let newValue: any = undefined;
    try {
        if (val !== null) {
            switch (type) {
                case String:
                    newValue = val;
                    break;
                case Number:
                    newValue = Number(val);
                    break;
                case Boolean:
                    newValue = !(val === 'false' || val === '0' || val === false);
                    break;
                case Array:
                case Object:
                    if (typeof val === 'string') {
                        newValue = JSON.parse(val.replace(/'/g, '"'));
                    } else if (Object.prototype.toString.call(val) === '[object Array]' || Object.prototype.toString.call(val) === '[object Object]') {
                        newValue = val;
                    } else {
                        newValue = JSON.parse(
                            val
                                .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
                                .replace(/'([\s\S]*?)'/g, '"$1"')
                                .replace(/,(\s*})/g, '$1'),
                        );
                    }
                    break;
                default:
                    newValue = val;
                    break;
            }
        } else {
            newValue = defaultValue;
        }
        return newValue;
    }
    catch (e) {
        console.warn("formatValue file, please input element attr", e);
        return newEval(val);
    }

}

export function isEqual(a: any, b: any) {
    if (a === b) {
        return true;
    }
    if (a == b) {
        return true;
    }
    if (Object.prototype.toString.call(a) === '[object Object]' && Object.prototype.toString.call(b) === '[object Object]') {
    }
    if (Object.prototype.toString.call(a) === '[object Array]' && Object.prototype.toString.call(b) === '[object Array]') {
    }
    return false;
}

export function newEval(fn: string) {
    try {
        const Fn = Function;
        return new Fn('return ' + fn)();
    }
    catch (e) {
        console.warn("eval fail", e);
    }

}
