## Empty 空状态

空状态时的占位提示。

### 基础用法

可通过fit确定图片如何适应到容器框，同原生 object-fit。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-empty description="描述文字"></wu-plus-empty>
    </div>
</template>
<script>
</script>
```
:::

### 自定义图片

通过设置 image 属性传入图片 URL。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-empty image="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></wu-plus-empty>
    </div>
</template>
<script>
</script>
```
:::

### 图片尺寸

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-empty size="150"></wu-plus-empty>
    </div>
</template>
<script>
</script>
```
:::

### 底部内容

使用默认插槽可在底部插入内容。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-empty>
            <wu-plus-button size="mini" type="primary">重试</wu-plus-button>
        </wu-plus-empty>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型     | 可选值 | 默认值  |
|---------- |-------- |--------|-----|------|
| image | 指定图片地址 | String | --  | --   |
| size | 图片大小（宽度） | Number | --  | 100  |
| description | 文本描述） | String | --  | --   |


### Slot

| 参数      | 说明    |
|---------- |-------- |
| --  | 自定义底部内容 |
| image  | 自定义图片 |
| description  | 自定义描述文字 |
