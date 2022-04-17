/**
 * 防抖
 * @param fn
 * @param wait
 */
function debounce(fn: any, wait: number) {
    let timeout;
    return function() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}

export { debounce };
