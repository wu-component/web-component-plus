## Link 超链接

文字超链接。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-link>测试链接</wu-plus-link>
        <wu-plus-link underline="true">测试链接</wu-plus-link>
        <wu-plus-link type="danger">测试链接</wu-plus-link>
        <wu-plus-link type="info">测试链接</wu-plus-link>
        <wu-plus-link type="success">测试链接</wu-plus-link>
        <wu-plus-link type="warning">测试链接</wu-plus-link>
        <wu-plus-link type="primary">测试链接</wu-plus-link>
        <wu-plus-link type="info" underline="true" href="www.baidu.com">测试链接</wu-plus-link>
    </div>
</template>
<script>
</script>
```
:::

### 下划线

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-link underline="true">测试链接</wu-plus-link>
    </div>
</template>
<script>
</script>
```
:::

### 超链接

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-link type="info" underline="true" href="https://www.baidu.com/" target="_blank">测试链接</wu-plus-link>
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
        <wu-plus-link type="info" disabled="true" underline="true" href="www.baidu.com">测试链接</wu-plus-link>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

继承原生 a 标签的属性。

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 按钮类型 | String | primary、success、warning、danger、info、text | primary |
| disabled | 禁用 | Boolean | true、false | false |
| underline | 下划线 | Boolean | true、false | false |
| href | 链接 | String | - | - |
