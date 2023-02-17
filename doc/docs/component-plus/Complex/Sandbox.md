## Sandbox 代码沙箱

该组件基于 iframe 实现了一个基础版的沙箱环境，包括基本的消息机制、代码执行、模块依赖等逻辑。

### 基础用法

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap;padding: 16px">
        <div class="button_list">
            <wu-plus-button class="button" size="mini" type="primary" @click="runCode(1)" title="点击在沙箱中执行代码">RunCode</wu-plus-button>
        </div>
       
        <div class="code_content" >
            <wu-code-sandbox @message="messageFun" id="codeSandbox" is-before-refresh="false" style="width: 70%;height: 100%"></wu-code-sandbox>
            <div class="code_log">
                <span class="log_item" v-for="(item, index) in logList">
                    <span>{{item.type}}:</span>
                    <span class="log_message">{{item.message}}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    
    export default {
        data() {
            return {
                logList: []
            }
        },
        methods: {
            runCode(action) {
                const editorContainer = document.querySelector("#codeSandbox");
                console.log("执行代码", [editorContainer]);
                if (action === 1) {
                    editorContainer?.runCode("js", `alert("宿主环境操作需要执行函数");`);
                    this.logList.push({
                        type: "host",
                        action: "eval code",
                        message: `eval code`
                    })
                    return
                }
            },
            /**
             * 监听来自沙箱的消息
             * @param e
             */
            messageFun(e) {
                this.logList.push({
                    type: "sandbox",
                    message: e?.detail.data?.action
                })
            }
        }
    }
</script>
<style>
    .code_content {
        border: 1px solid #cccccc;
        width: 100%; height: 150px; display: flex; flex-direction: row;
        margin-top: 16px;
    }
    .code_log {
        width: 30%;background: rgba(0 ,0, 0, 0.7);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        padding: 4px;
        overflow: scroll;
        font-size: 12px;
    }
    .log_item {
        line-height: 16px;
    }
    .log_message {
        padding-left: 6px;
        
    }
    .button_list {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }
    .button {
        margin-right: 8px;
    }
</style>
```
:::

### Attributes

| 参数              | 说明 | 类型      | 可选值       | 默认值   |
|-----------------|--|---------- |-------------  |-------- |
| is-before-refresh | 执行代码前是否需要重载沙箱 |Boolean |true、false|  false |

### Methods

| 方法名  | 说明 | 方法                      | 
|--------|--|-------------------------|
|runCode| 沙箱执行代码 | (type, codeStr) => void |
|loadDependencies| 沙箱中加载依赖 | (dependencies: {dependencies: Record<string, string>}) => void |
