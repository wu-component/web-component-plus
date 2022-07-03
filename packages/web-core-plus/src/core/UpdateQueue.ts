class Scheduler {
    private callbacks: any[];
    constructor(){
        this.callbacks = [];
        /* 微任务批量处理 */
        queueMicrotask(()=>{
            this.runTask();
        });
    }
    /* 增加任务 */
    addTask(fn){
        this.callbacks.push(fn);
    }
    runTask(){
        console.log('------合并更新开始------');
        while(this.callbacks.length > 0){
            const cur = this.callbacks.shift();
            cur();
        }
        console.log('------合并更新结束------');
        console.log('------执行update 组件------');
    }
}
const scheduler = new Scheduler();
function nextTick(cb){
    cb(scheduler.addTask.bind(scheduler));
}

/* 模拟一次更新 */
function mockOnclick1(){
    nextTick((add)=>{
        add(function(){
            console.log('第一次更新');
        });
        // console.log('----宏任务逻辑----')
        add(function(){
            console.log('第二次更新');
        });
    });
}

function mockOnclick2() {
    nextTick((callback) => {
        callback(() => {
            console.log("数据操作");
        });
    });
}

mockOnclick1();
mockOnclick2();
