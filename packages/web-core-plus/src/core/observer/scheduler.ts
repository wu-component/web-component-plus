import Watcher from "./watcher";
import { nextTick } from "./next-tick";

const queue: Array<Watcher> = [];
const has: { [key: number]: boolean } = {};
let waiting = false;
// @ts-ignore
let flushing = false;
const index = 0;

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
    // 将flushing设置为true(标志锁)
    flushing = true;
    let watcher, id;

    // 依次执行watcher的run方法，进行更新dom
    for (let index = 0; index < queue.length; index++) {
        watcher = queue[index];
        if (watcher.before) {
            watcher.before();
        }
        id = watcher.id;
        has[id] = null;
        // 更新dom
        watcher.run();
    }
}


export function queueWatcher(watcher: Watcher) {
    const id = watcher.id;
    //根据id是否重复做优化
    if(!has[id]){
        has[id] = true;
        if(!flushing){
            queue.push(watcher);
        }else{
            let i=queue.length - 1;
            while(i > index && queue[i].id > watcher.id){
                i--;
            }
            queue.splice(i + 1, 0, watcher);
        }

        if(!waiting){
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}
