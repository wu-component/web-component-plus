## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

wu-plus-container：外层容器。当子元素中包含 wu-plus-header> 或 wu-plus-footer 时，全部子元素会垂直上下排列，否则会水平左右排列。

wu-plus-header：顶栏容器。

wu-plus-aside：侧边栏容器。

wu-plus-main：主要区域容器。

wu-plus-footer：底栏容器。

### 常见页面布局

::: demo
```html
<template>
    <div style="width:100%" class="container-test">
        <wu-plus-container>
            <wu-plus-header>Header</wu-plus-header>
            <wu-plus-main>Main</wu-plus-main>
        </wu-plus-container>
        <p></p>
        <wu-plus-container>
            <wu-plus-header>Header</wu-plus-header>
            <wu-plus-main>Main</wu-plus-main>
            <wu-plus-footer>Footer</wu-plus-footer>
        </wu-plus-container>
        <p></p>
        <wu-plus-container>
            <wu-plus-aside width="200px">Aside</wu-plus-aside>
            <wu-plus-main>Main</wu-plus-main>
        </wu-plus-container>

        <p></p>


        <wu-plus-container>
            <wu-plus-header>Header</wu-plus-header>
            <wu-plus-container>
                <wu-plus-aside width="200px">Aside</wu-plus-aside>
                <wu-plus-main>Main</wu-plus-main>
            </wu-plus-container>
        </wu-plus-container>
        <p></p>
        <wu-plus-container>
            <wu-plus-header>Header</wu-plus-header>
            <wu-plus-container >
                <wu-plus-aside width="200px">Aside</wu-plus-aside>
                <wu-plus-container style="width:100%">
                    <wu-plus-main>Main</wu-plus-main>
                    <wu-plus-footer>Footer</wu-plus-footer>
                </wu-plus-container>
            </wu-plus-container>
        </wu-plus-container>
        <p></p>
        <wu-plus-container>
            <wu-plus-aside width="200px">Aside</wu-plus-aside>
            <wu-plus-container style="width:100%">
                <wu-plus-header>Header</wu-plus-header>
                <wu-plus-main>Main</wu-plus-main>
            </wu-plus-container>
        </wu-plus-container>
        <p></p>
        <wu-plus-container>
            <wu-plus-aside width="200px">Aside</wu-plus-aside>
            <wu-plus-container style="width:100%">
                <wu-plus-header>Header</wu-plus-header>
                <wu-plus-main>Main</wu-plus-main>
                <wu-plus-footer>Footer</wu-plus-footer>
            </wu-plus-container>
        </wu-plus-container>
    </div>
</template>
<script>
</script>
<style>
    .container-test wu-plus-header, .container-test wu-plus-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .container-test wu-plus-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .container-test wu-plus-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        width: 100%;
    }

    .container-test wu-plus-container {
    }

    .container-test wu-plus-container:nth-child(5) wu-plus-aside,
    .container-test wu-plus-container:nth-child(6) wu-plus-aside {
        line-height: 260px;
    }

    .container-test wu-plus-container:nth-child(7) wu-plus-aside {
        line-height: 320px;
    }
</style>
```
:::

### Container Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction | 子元素的排列方向 | DirectionEnums | horizontal、 vertical | 子元素中有 wu-plus-header 或 wu-plus-footer 时为 vertical，否则为 horizontal |


### Header Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| height | 顶栏高度 | String | -- | 60px |

### Aside Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 侧边栏宽度 | String | -- |300px |

### Footer Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| height | 底栏高度 | String | -- | 60px |


