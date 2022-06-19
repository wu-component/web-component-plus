export function getParams(toArr, pathArr) {
    const params = {};
    toArr.forEach(function (item, index) {
        if (index > 0) {
            params[pathArr[index].replace(':', '')] = item;
        }
    });
    return params;
}

export function getUrlParams(url) {
    url = url.replace(/#.*$/, '');
    const queryArray = url.split(/[?&]/).slice(1);
    let i;
    const args = {};
    for (i = 0; i < queryArray.length; i++) {
        const match = queryArray[i].match(/([^=]+)=([^=]+)/);
        if (match !== null) {
            args[match[1]] = decodeURIComponent(match[2]);
        }
    }
    return args;
}

export function decodeParams(url: string, obj: Record<any, any> = {}) {
    let result = '';
    let item;
    if (url.includes("?")) {
        for (item in obj) {
            if (obj[item] && String(obj[item])) {
                result += `${item}=${obj[item]}&`;
            }
        }
    }else{
        result += "?";
        for (item in obj) {
            if (obj[item] && String(obj[item])) {
                result += `${item}=${obj[item]}&`;
            }
        }
    }
    let str = url + result;
    if (str.endsWith('&')) {
        str = str.substring(0, str.length - 1);
    }
    return str
}
