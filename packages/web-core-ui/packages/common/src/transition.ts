/**
 * 鼠标移入动画
 * @param el
 * @param effect
 * @param delay
 */
export async function enter(el: HTMLElement, effect: string, delay?: number) {
    return new Promise(resolve => {
        el.classList.remove(effect + '-leave-active');
        el.classList.remove(effect + '-leave-to');
        el.classList.add(effect + '-enter');
        el.classList.add(effect + '-enter-active');

        const callback = function() {
            el.classList.remove(effect + '-enter-active');
            resolve(1);
        };
        once(el, 'transitionend', callback);
        once(el, 'animationend', callback);

        window.setTimeout(function() {
            el.classList.remove(effect + '-enter');
            el.classList.add(effect + '-enter-to');
        }, delay);
    });
}

/**
 * 鼠标移除动画
 * @param el
 * @param effect
 * @param delay
 */
export async function leave(el: HTMLElement, effect: string, delay?: number) {
    return new Promise(resolve => {
        el.classList.remove(effect + '-enter-active');
        el.classList.remove(effect + '-enter-to');
        el.classList.add(effect + '-leave');
        el.classList.add(effect + '-leave-active');

        const callback = function(e) {
            el.classList.remove(effect + '-leave-active');

            resolve(1);
        };

        once(el, 'transitionend', callback);
        once(el, 'animationend', callback);

        window.setTimeout(function() {
            el.classList.remove(effect + '-leave');
            el.classList.add(effect + '-leave-to');
        }, delay);
    });
}

function once(el: HTMLElement, name: string, callback: (e?) => void) {
    const wrapCall = function() {
        this.removeEventListener(name, wrapCall);
        callback();
    }.bind(el);
    el.addEventListener(name, wrapCall);
}
