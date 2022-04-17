/**
 * classNames based on https://github.com/JedWatson/classnames
 * by Jed Watson
 * Licensed under the MIT License
 * https://github.com/JedWatson/classnames/blob/master/LICENSE
 * modified by dntzhang
 */

const hasOwn = {}.hasOwnProperty;

function classNames() {
    const classes = [];
    for (let i = 0; i < arguments.length; i++) {
        const arg: any[] = arguments[i];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
            // @ts-ignore
            const inner: any = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        } else if (argType === 'object') {
            for (const key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

function extractClass(a: any, b: any, c: any) {
    const [ props, ...args ] = Array.prototype.slice.call(arguments, 0);
    if (props.class) {
        args.unshift(props.class);
        delete props.class;
    } else if (props.className) {
        args.unshift(props.className);
        delete props.className;
    }
    if (args.length > 0) {
        return { class: classNames.apply(null, args) };
    }
    return { class: '' };
}

/**
 * 庫歐戰屬性
 * @param props
 * @param prop
 */
function extract(props: any, prop: any) {
    if (typeof prop === 'string') {
        if (props.hasOwnProperty(prop)) {
            return { [prop]: props[prop] };
        }
    } else {
        const res = {};
        prop.forEach(key => {
            if (props.hasOwnProperty(key)) {
                res[key] = props[key];
            }
        });
        return res;
    }
    return {};
}

export { classNames, extract, extractClass };
