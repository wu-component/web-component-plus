## Rate 评分

评分组件。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-rate value="1" id="rateTest"></wu-plus-rate>
        <wu-plus-rate id="rateTest2"></wu-plus-rate>
    </div>
</template>
<script>
</script>
```
:::

### 自定义颜色

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-rate id="rateTest2" colors="['blue', 'blue', 'blue', 'blue','blue']"></wu-plus-rate>
    </div>
</template>
<script>
</script>
```
:::

### 辅助文字

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-rate id="rateTest5" show-text="true"></wu-plus-rate>
        <wu-plus-rate id="rateTest6" show-text="true" texts="['差', '不太好', '一般', '还行', '特别好']"></wu-plus-rate>
    </div>
</template>
<script>
</script>
```
:::

### 禁用

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-rate id="rateTest7" value="2" show-text="true" disabled="true"></wu-plus-rate>
    </div>
</template>
<script>
</script>
```
:::

### 自定义图标

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-rate id="rateTest7" value="2" rate-list="['①', '②', '③', '④', '⑤']"></wu-plus-rate>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 当前值 | Number | 以0开始  | -- |
| max  | 默认为5, 如果自定义的max 大于5时，需要传入colors、rate-list，texts 酌情使用 | Number | 正整数  | 5 |
| disabled | 禁用 | Boolean | true、false | false |
| colors | icon 的颜色集合，数组长度和ma一致 | string[] | 任意颜色集合  | [ '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A', '#F7BA2A' ] |
| void-color | 未选中 icon 的颜色 | String |  --  | #C6D1DE |
| disabled-void-color | 禁用未选中 icon 的颜色 | String |  --  | #EFF2F7 |
| show-text | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | Boolean |  true、false  | false |
| text-color | 辅助文字的颜色 | String |  --  | #1f2d3d |
| texts | 辅助文字数组 | String[] |  --  | [ '极差', '失望', '一般', '满意', '惊喜' ] |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
