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

/**
 * 节流
 * @param callback
 * @param duration
 */
function throttle(callback: any, duration: number) {
    let lastTime = new Date().getTime();
    return function() {
        const now = new Date().getTime();
        if (now - lastTime > 500) {
            callback();
            lastTime = now;
        }
    };
}

export { debounce, throttle };
