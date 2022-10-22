## Dialog 对话框

常用于主动操作后的反馈提示。

### 基础用法

页面中的非浮层元素，不会自动消失。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-dialog visible="false" title="提示" id="dialogTest1">
            <span>你还，dialog</span>
            <span slot="footer">
            <wu-plus-button size="mini" @click="cancle">取 消</wu-plus-button>
            <wu-plus-button size="mini" @click="ok" type="primary">确 定</wu-plus-button>
        </span>
        </wu-plus-dialog>

        <wu-plus-button id="dialogButtonControl">打开弹框</wu-plus-button>
    </div>
</template>
<script>
    export default {
        mounted() {
            setTimeout(() => {
                const dialogButtonControl = document.getElementById('dialogButtonControl');
                dialogButtonControl.addEventListener('click', () => {
                    const dom = document.getElementById("dialogTest1");
                    dom.visible = true;
                })
            })

        },
        methods: {
            cancle() {
                const dom = document.getElementById("dialogTest1");
                dom.visible = false;
            },
            ok() {
                webUIPlus.Message.setOption({
                    message: "点击确认按钮",
                    type: "success",
                    duration: 2000
                })
            }
        }
    }
</script>
```
:::

### Attributes

| 参数                   | 说明          | 类型          | 可选值   | 默认值    |
|----------------------|-------------|-------------|-------|--------|
| title                | 	弹框标题       | 	String     | 	--	  | --     |
| visible	是否显示	Boolean | 	true、false | 	false      |
| show-close	是否显示关闭按钮  | 	Boolean    | 	true、false | 	true |
| width	               | 宽度	         | String      | 	--   | 	'50%' |

### Event

| 事件名    | 说明  | 参数                           | 
|--------|-----|------------------------------|
| open	  | 打开	 | (event: CustomEvent) => void |
| close	 | 关闭	 | (event: CustomEvent) => void |

### Slot

| 参数     | 说明               |
|--------|------------------|
| footer | 	Dialog 按钮操作区的内容 |
| --	    | Dialog 的内容       |

