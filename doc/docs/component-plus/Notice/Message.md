## Message 消息提示

常用于主动操作后的反馈提示。

### 基础用法 && 不同状态

从顶部出现，3 秒后自动消失。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-button size="mini" id="messageButton1">info消息</wu-plus-button>
        <wu-plus-button style="margin-left: 8px" size="mini" id="messageButton2">success消息</wu-plus-button>
        <wu-plus-button style="margin-left: 8px" size="mini" id="messageButton3">warning消息</wu-plus-button>
        <wu-plus-button style="margin-left: 8px" size="mini" id="messageButton4">error消息</wu-plus-button>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$nextTick(() => {
                document.querySelector("#messageButton1").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息1",
                        type: "info",
                        duration: 3000
                    })
                })
                document.querySelector("#messageButton2").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息2",
                        type: "success",
                        duration: 4000
                    })
                })
                document.querySelector("#messageButton3").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息3",
                        type: "warning",
                        duration: 5000
                    })
                })
                document.querySelector("#messageButton4").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息4",
                        type: "error",
                        duration: 6000
                    })
                })
            })

        }
    }
</script>
```
:::

### 可关闭

可以添加关闭按钮。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-button size="mini" id="messageButton5" type="success">success消息</wu-plus-button>
    </div>
</template>
<script>
    export default {
        mounted() {
            setTimeout(() => {
                document.querySelector("#messageButton5").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息1",
                        type: "success",
                        showClose: true,
                        duration: 6000
                    })
                })
            }, 1000)

        }
    }
</script>
```
:::

### 文字居中

使用 center 属性让文字水平居中。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-button size="mini" id="messageButton6" type="success">success消息</wu-plus-button>
    </div>
</template>
<script>
    export default {
        mounted() {
            setTimeout(() => {
                document.querySelector("#messageButton6").addEventListener("click", () => {
                    webUIPlus.Message.setOption({
                        message: "测试消息1",
                        type: "success",
                        showClose: false,
                        duration: 3000,
                        center: true
                    })
                })
            }, 1000)

        }
    }
</script>
```
:::

### Attributes

| 参数         | 说明                     | 类型          | 可选值                        | 默认值     |
|------------|------------------------|-------------|----------------------------|---------|
| message    | 	消息文字                  | 	String     | 	--	                       | ''      |
| type	      | 主题	                    | TypeEnums	  | success/warning/info/error | 	'info' |
| duration   | 	显示时间, 毫秒。设为 0 则不会自动关闭 | 	Number     | --	                        | 0       |
| showClose	 | 是否显示关闭按钮	Boolean       | 	true、false | 	false                     |
| center     | 	文字是否居中                | 	Boolean    | 	true、false                | 	false  |

### Event

| 事件名   | 说明                               | 参数  | 
|-------|----------------------------------|-----|
| close | 	关闭	(event: CustomEvent) => void |


