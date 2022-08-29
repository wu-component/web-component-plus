
## Popconfirm 气泡确认框

点击元素，弹出气泡确认框。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                content="这是一段内容确定删除吗？"
        >
            <wu-plus-button slot="reference">删除</wu-plus-button>
        </wu-plus-popconfirm>
    </div>
</template>
<script>
</script>
```
:::

### 自定义

可以在 Popconfirm 中自定义内容。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                content="这是一段内容确定删除吗？"
        >
            <wu-plus-icon style="font-size: 12px;margin-right:8px" name="setting" slot="icon"></wu-plus-icon>
            <wu-plus-button slot="reference" type="danger">删除</wu-plus-button>
        </wu-plus-popconfirm>
    </div>
</template>
<script>
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content | 标题 | String | --| -- |
| confirm-button-text | 确认按钮文字 | String | --| -- |
| cancel-button-text | 取消按钮文字 | String | --| -- |
| confirm-button-type | 确认按钮类型 | WuButtonType | primary、success、warning、danger、info、text| primary |
| cancel-button-type | 取消按钮类型 | WuButtonType | primary、success、warning、danger、info、text| text |
| hide-icon | 是否隐藏 Icon | Boolean | true、 false | false |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| confirm | 确认按钮点击 | (event: CustomEvent) => void |
| cancel | 取消按钮点击 | (event: CustomEvent) => void |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| reference  | 触发 Popconfirm 显示的 HTML 元素 |
| icon  | 提示 content 前的 icon 内容，用于内容强调 |
