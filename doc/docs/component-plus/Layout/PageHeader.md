## PageHeader 布局

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

### 基础用法

适用广泛的基础用法。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-page-header id="backHeader" header="标题" content="主体" />
    </div>
</template>
<script>
</script>
```
:::

### 插槽使用

自定义标题内容和主体内容。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-page-header id="backHeader">
            <span slot="header">插槽标题</span>
            <span slot="content">插槽主体</span>
        </wu-plus-page-header>
    </div>
</template>
<script>
</script>
```
:::



### Breadcrumb Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 标题 | String | -- | '返回' |
| content | 内容 | String | -- |--  |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| back | 点击返回 | (event: CustomEvent) => void |
