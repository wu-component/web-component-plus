import { BaseCustomComponent } from "../declarations";

interface Watcher extends BaseCustomComponent {
    callUpdate(...args): void;
}

let queue: Array<Watcher> = [];
const has: { [key: number]: any } = {};

/**
 * 特别简单得异步批量异步更新， 采用 Promise 实现更新最后的操作
 * @param watcher
 */
export function queueWatcher(watcher: Watcher) {
    const id = watcher.elementId;
    has[id] = true;
    queue.push(watcher);
    nextTick();
}


export function nextTick (cb?: Function, ctx?: Object): any {
    Promise.resolve().then(() => {
        if (queue.length) {
            queue[queue.length  -1].callUpdate();
            queue = [];
        }
    }).catch(e => {
        console.warn(e);
    });
}
