## Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-switch value="true" id="switchId"></wu-plus-switch>
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
        <wu-plus-switch value="true" id="switchId1" active-color="yellow" inactive-color="red"></wu-plus-switch>
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
        <wu-plus-switch value="false" disabled="true" id="switchId1"></wu-plus-switch>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 是否打开 | Boolean | true、false  | -- |
| disabled | 禁用 | Boolean | true、false | false |
| activeColor | 激活的颜色 | String | -- | #409EFF |
| inactiveColor | 未激活的颜色 | String | -- | #C0CCDA |
| width | 宽度 | Number | -- | 40 |
| name | switch 对应的 name 属性 | String | -- | -- |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
| input | 输入值 | (event: CustomEvent) => void |
