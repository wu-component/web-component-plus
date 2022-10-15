let callbacks = [];
let pending = false;

export function nextTick(cb?: Function, ctx?: Object) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                // handleError(e, ctx, 'nextTick');
                console.log(e);
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timerFunc();
    }
}

let timerFunc;

if (typeof Promise !== 'undefined') {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
    };
}

// 异步执行完后，执行所有的回调方法，也就是执行 flushSchedulerQueue
function flushCallbacks() {
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]();
    }
    callbacks = [];
}
