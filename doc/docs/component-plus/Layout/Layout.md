## Layout 布局

常用的操作按钮。

### 基础用法

::: demo
```html
<template>
    <div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%">
            <wu-plus-row>
                <wu-plus-col span="12">
                    <div style="height: 40px;background:#d3dce6">12</div>
                </wu-plus-col>
                <wu-plus-col span="12">
                    <div style="height: 40px;background:#e5e9f2">12</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row>
                <wu-plus-col span="4">
                    <div style="height: 40px;background:#d3dce6">4</div>
                </wu-plus-col>
                <wu-plus-col span="20">
                    <div style="height: 40px;background:#e5e9f2">20</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row>
                <wu-plus-col span="20">
                    <div style="height: 40px;background:#d3dce6">4</div>
                </wu-plus-col>
                <wu-plus-col span="4">
                    <div style="height: 40px;background:#e5e9f2">20</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 对齐方式

通过 flex 布局来对分栏进行灵活的对齐。

::: demo
```html
<template>
    <div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row type="flex" justify="space-around">
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#d3dce6">10</div>
                </wu-plus-col>
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#e5e9f2">10</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row type="flex" justify="start">
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#d3dce6">10</div>
                </wu-plus-col>
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#e5e9f2">10</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row type="flex" justify="end">
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#d3dce6">10</div>
                </wu-plus-col>
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#e5e9f2">10</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px">
            <wu-plus-row type="flex" justify="center">
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#d3dce6">10</div>
                </wu-plus-col>
                <wu-plus-col span="10">
                    <div style="height: 40px;background:#e5e9f2">10</div>
                </wu-plus-col>
            </wu-plus-row>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### Row Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 布局模式，可选 flex，现代浏览器下有效 | TypeEnums | flex | - |
| justify | flex 布局下的水平排列方式 | JustifyEnums | start/end/center/space-around/space-between | - |
| align | flex 布局下的垂直排列方式 | AlignEnums | top/middle/bottom | - |


### Col Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| span | 栅格占据的列数 | TypeEnums | Number | - |
