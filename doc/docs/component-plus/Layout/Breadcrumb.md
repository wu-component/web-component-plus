## Breadcrumb 布局

显示当前页面的路径。

### 基础用法

适用广泛的基础用法。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-breadcrumb>
            <wu-plus-breadcrumb-item to="/hom">活动管理</wu-plus-breadcrumb-item>
            <wu-plus-breadcrumb-item>活动列表</wu-plus-breadcrumb-item>
            <wu-plus-breadcrumb-item>活动详情</wu-plus-breadcrumb-item>
        </wu-plus-breadcrumb>
    </div>
</template>
<script>
</script>
```
:::

### 图标分隔符

适用广泛的基础用法。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-breadcrumb separator="——">
            <wu-plus-breadcrumb-item to="/hom">活动管理</wu-plus-breadcrumb-item>
            <wu-plus-breadcrumb-item>活动列表</wu-plus-breadcrumb-item>
            <wu-plus-breadcrumb-item>活动详情</wu-plus-breadcrumb-item>
        </wu-plus-breadcrumb>
    </div>
</template>
<script>
</script>
```
:::



### Breadcrumb Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| separator | 分隔符 | String | -- | '/' |


### Breadcrumb Item Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| to | 对应的路由地址 | String | -- | -- |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
