import { converterFunction } from '@/type';
export function newEval(fn: string) {
    try {
        const Fn = Function;
        return new Fn('return ' + fn)();
    }
    catch (e) {
        console.warn("eval fail", e);
    }

}

export const isEmpty = (val: unknown) => !(val || val === false || val === 0);

export const defaultConverter: converterFunction = (value, type?) => {
    try {
        let newValue = value;
        switch (type) {
            case String:
                newValue = isEmpty(value) ? value : String(value);
                break;
            case Number:
                newValue = isEmpty(value) ? value : Number(value);
                break;
            case Boolean:
                newValue = !([ null, "false", false, undefined ].indexOf(value) > -1);
                break;
            case Array:
            case Object:
                if (typeof value === 'string') {
                    newValue = JSON.parse(value.replace(/'/g, '"'));
                } else if (Object.prototype.toString.call(value) === '[object Array]' || Object.prototype.toString.call(value) === '[object Object]') {
                    newValue = value;
                } else {
                    newValue = JSON.parse(
                        value
                            .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:([^\/])/g, '"$2":$4')
                            .replace(/'([\s\S]*?)'/g, '"$1"')
                            .replace(/,(\s*})/g, '$1'),
                    );
                }
                break;
        }
        return newValue;
    }catch (e) {
        console.warn("formatValue file, please input element attr", e);
        return newEval(value);
    }

};


export function deepCopy(data) {
    // 可拷贝类型，undefined，object,array,null,new Date()，new RegExp('\\w+')，NaN
    if (data && typeof data === "object") {
        //针对函数的拷贝
        if (typeof data === "function") {
            const tempFunc = data.bind(null);
            tempFunc.prototype = deepCopy(data.prototype);
            return tempFunc;
        }

        switch (Object.prototype.toString.call(data)) {
            case "[object String]":
                return data.toString();
            case "[object Number]":
                return Number(data.toString());
            case "[object Boolean]":
                return new Boolean(data.toString());
            case "[object Date]":
                return new Date(data.getTime());
            case "[object Array]":
                const arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr[i] = deepCopy(data[i]);
                }
                return arr;

            //js自带对象或用户自定义类实例
            case "[object Object]":
                const obj = {};
                for (const key in data) {
                    //会遍历原型链上的属性方法，可以用hasOwnProperty来控制 （obj.hasOwnProperty(prop)
                    obj[key] = deepCopy(data[key]);
                }
                return obj;
            case "[object RegExp]":
                return new RegExp(data);
            default:
                return data;
        }
    } else {
        //string,number,bool,null,undefined,symbol
        return data;
    }
}

/**
 * 将骆驼命名规则的字符串转换成使用短横线命名法的字符串, 并且全小写 .例如:'getElementById'=>'get-element-by-id'
 * @param str
 */
export function getKebabCase( str: string ) {
    return str.replace( /[A-Z]/g, function( i ) {
        return '-' + i.toLowerCase();
    });
}

/**
 * 将短横线命名法的字符串转换成使用骆驼命名规则的字符串, 并且全小写 .例如:'get-element-by-id'=>'getElementById'
 * @param str
 */
export function getCamelCase( str: string ) {
    return str.replace( /-([a-z])/g, function( all, i ){
        return i.toUpperCase();
    });
}
