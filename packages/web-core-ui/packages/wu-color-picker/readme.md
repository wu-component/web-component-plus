
## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-color-picker id="colorPicker" />
    </div>
</template>
<script>
</script>
```
:::

### 默认值

支持 rgba 或十六进制颜色。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-color-picker defaultvalue="rgba(19, 206, 102, 0.9)" id="colorPicker2" />
        <wu-plus-color-picker defaultvalue="#409EFF" id="colorPicker20" />
    </div>
</template>
<script>
</script>
```
:::

### 不同尺寸

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-color-picker size="medium" />
        <wu-plus-color-picker size="small" />
        <wu-plus-color-picker size="mini" />
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
        <wu-plus-color-picker id="colorPicker14" disabled="true" />
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数            | 说明 | 类型      | 可选值        | 默认值     |
|---------------|--|---------|------------|---------|
| defaultvalue | 默认颜色值 | String | -- | #ffffff     |
| disabled    | 禁用 | String  | --         | false   |

### Event

| 事件名    | 说明  | 参数                           | 
|--------|-----|------------------------------|
| change | 值修改 | (event: CustomEvent) => void |
