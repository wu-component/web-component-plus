
## Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

### 基础用法

::: demo
```html
<template>
    <div style="width: 100%; display: flex;flex-direction: column;align-items: center">
        <div style="margin: 8px">
            <wu-plus-tooltip content="提示文字 top" effect="dark" position="top">
                <wu-plus-button size="mini" type="primary">上边</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 top-start" effect="dark" position="top-start">
                <wu-plus-button size="mini" type="primary">左上</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 top-end" effect="dark" position="top-end">
                <wu-plus-button size="mini" type="primary">右上</wu-plus-button>
            </wu-plus-tooltip>
        </div>
        <div style="margin: 8px">

            <wu-plus-tooltip content="提示文字 left-start" effect="dark" position="left-start">
                <wu-plus-button size="mini" type="primary">左上</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 left" effect="dark" position="left">
                <wu-plus-button size="mini" type="primary">左边</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 left-end" effect="dark" position="left-end">
                <wu-plus-button size="mini" type="primary">左下</wu-plus-button>
            </wu-plus-tooltip>
        </div>
        <div style="margin: 8px">

            <wu-plus-tooltip content="提示文字 right-start" effect="dark" position="right-start">
                <wu-plus-button size="mini" type="primary">右上</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 right" effect="dark" position="right">
                <wu-plus-button size="mini" type="primary">右边</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 right-end" effect="dark" position="right-end">
                <wu-plus-button size="mini" type="primary">右下</wu-plus-button>
            </wu-plus-tooltip>
        </div>
        <div style="margin: 8px">
            <wu-plus-tooltip content="提示文字 bottom-start" effect="dark" position="bottom-start">
                <wu-plus-button size="mini" type="primary">左下</wu-plus-button>
            </wu-plus-tooltip>

            <wu-plus-tooltip content="提示文字 bottom" effect="dark" position="bottom">
                <wu-plus-button size="mini" type="primary">下边</wu-plus-button>
            </wu-plus-tooltip>


            <wu-plus-tooltip content="提示文字 bottom-end" effect="dark" position="bottom-end">
                <wu-plus-button size="mini" type="primary">右下</wu-plus-button>
            </wu-plus-tooltip>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 主题

Tooltip 组件提供了两个不同的主题：dark和light。

::: demo
```html
<template>
    <div style="display: flex; height: 100px; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-tooltip content="dark" effect="dark">
            <wu-plus-button size="mini" type="primary">下边</wu-plus-button>
        </wu-plus-tooltip>


        <wu-plus-tooltip content="light" effect="light">
            <wu-plus-button size="mini" type="primary" style="margin-left: 16px">右下</wu-plus-button>
        </wu-plus-tooltip>
    </div>
</template>
<script>
</script>
```
:::

### 更多 Content

content 不传时，可以通过 slot 自定义内容。

::: demo
```html
<template>
    <div style="display: flex; height: 100px; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-tooltip effect="dark">
            <wu-plus-button size="mini" type="primary">slot</wu-plus-button>
            <span slot="content">提示信息</span>
        </wu-plus-tooltip>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content | 提示内容 | String | --| -- |
| position | 出现位置 | Placement | top-start、top-end、bottom-start、bottom-end、<br> right-start、right-end、left-start、 <br> left-end、top、bottom、left、right| bottom |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| content  | 弹出内容 |
| --  | 目标内容 |
