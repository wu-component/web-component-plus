

## Card 卡片

将信息聚合在卡片容器中展示。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-card class="box-card" style="width: 400px">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <wu-plus-button style="float: right; padding: 3px 0" type="text">操作按钮</wu-plus-button>
            </div>
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
        </wu-plus-card>
    </div>
</template>
<script>
</script>
```
:::

### 简单卡片

卡片可以只有内容区域。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-card class="box-card" style="width: 400px" header-show="false">
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
            <div class="text item">列表内容</div>
        </wu-plus-card>
    </div>
</template>
<script>
</script>
```
:::

### 卡片阴影

可对阴影的显示进行配置，通过shadow属性设置卡片阴影出现的时机：always、hover或never。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-card shadow="always" style="width: 150px" header-show="false">
            总是显示
        </wu-plus-card>
        <wu-plus-card shadow="hover" style="width: 150px" header-show="false">
            鼠标悬浮时显示
        </wu-plus-card>
        <wu-plus-card shadow="never" style="width: 150px" header-show="false">
            从不显示
        </wu-plus-card>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 slot#header 传入 DOM | String | - | - |
| body-style | 设置 body 的样式 | Object | - | { padding: '20px' } |
| header-show | 头部是否展示 | Boolean | true、false| true |
| shadow | 设置阴影显示时机 | String | always、 hover、never | 'always' |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| --  | 自定义主体内容 |
| header  | 自定义header |
