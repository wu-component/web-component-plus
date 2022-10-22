
## Alert 警告

用于页面中展示重要的提示信息。

### 基础用法

页面中的非浮层元素，不会自动消失。

::: demo
```html
<template>
    <div style="width: 60%; display: flex; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-alert tip="成功提示的文案" type="success" effect="dark"></wu-plus-alert>
        <p class="line-height"></p>
        <wu-plus-alert tip="消息提示的文案" type="info" effect="dark"></wu-plus-alert>
        <p class="line-height"></p>
        <wu-plus-alert tip="警告提示的文案" type="warning" effect="dark"></wu-plus-alert>
        <p class="line-height"></p>
        <wu-plus-alert tip="错误提示的文案" type="error" effect="dark"></wu-plus-alert>
    </div>
</template>
<script>
</script>
```
:::

### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。closable属性决定是否可关闭，接受boolean，默认为true。你可以设置close-text属性来代替右侧的关闭图标，注意：close-text必须为文本。设置close事件来设置关闭时的回调。

::: demo
```html
<template>
    <div style="width: 60%; display: flex; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-alert tip="不可关闭的 alert" type="success" closable="false"></wu-plus-alert>
        <p class="line-height"></p>
        <wu-plus-alert tip="自定义 close-text" type="info" close-text="知道了"></wu-plus-alert>
    </div>
</template>
<script>
</script>
```
:::

### 带有 icon

表示某种状态时提升可读性。

::: demo
```html
<template>
    <div style="width: 60%; display: flex; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-alert tip="成功提示的文案 展示icon" type="success" show-icon="true">
            <wu-plus-icon style="font-size: 12px" name="warning-outline" slot="icon"></wu-plus-icon>
        </wu-plus-alert>
    </div>
</template>
<script>
</script>
```
:::

### 文字居中

使用 center 属性让文字水平居中。

::: demo
```html
<template>
    <div style="width: 60%; display: flex; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-alert tip="成功提示的文案 展示icon" type="success" show-icon="true" center></wu-plus-alert>
        <p class="line-height"></p>
    </div>
</template>
<script>
</script>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

::: demo
```html
<template>
    <div style="width: 60%; display: flex; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-alert
                tip="成功提示的文案 展示icon"
                type="success" show-icon="true"
                description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发化为灰……"
        ></wu-plus-alert>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

<style>
</style>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tip | 消息文字 | String | --| '' |
| type | 主题 | TypeEnums | success/warning/info/error| 'info' |
| description | 辅助性文字。也可通过默认 slot 传入 | String | --| '' |
| closable | 是否可关闭 |Boolean | true、false | true |
| center | 文字是否居中 |Boolean | true、false | false |
| close-text | 关闭按钮自定义文本 |String | -- | '' |
| show-icon | 是否展示图标，需要展示时通过 slot 传入 |Boolean | true、false | false |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| close | 关闭 | (event: CustomEvent) => void |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| title  | 自定义内容 |
| icon  | 提示 content 前的 icon 内容，用于内容强调 |
| description  | 描述信息 |
