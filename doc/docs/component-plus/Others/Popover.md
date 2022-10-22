
## Popover 弹出框

常用于主动操作后的反馈提示。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-popover style="width: 160px">
            <wu-plus-button size="mini"  type="primary">点击触发弹出底部信息</wu-plus-button>
            <div slot="popover" tip="popover">
                <div style="height: 28px;line-height: 28px;padding-left: 6px;">提示信息</div>
            </div>
        </wu-plus-popover>
        <wu-plus-popover style="width: 160px" position="top">
            <wu-plus-button size="mini"  type="primary" >点击触发弹出顶部信息</wu-plus-button>
            <div slot="popover" tip="popover">
                <div style="height: 28px;line-height: 28px;padding-left: 6px;">提示信息</div>
            </div>
        </wu-plus-popover>
    </div>
</template>
<script>
</script>
```
:::

### 不同触发方式

提供点击和鼠标进入触发。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
            <wu-plus-popover style="width: 160px" trigger="hover">
                <wu-plus-button size="mini"  type="primary" >鼠标进入触触发</wu-plus-button>
                <div slot="popover" tip="popover">
                    <div style="height: 28px;line-height: 28px;padding-left: 6px;">提示信息</div>
                </div>
            </wu-plus-popover>
            <wu-plus-popover style="width: 160px" trigger="click">
                <wu-plus-button size="mini"  type="primary" >点击触触发</wu-plus-button>
                <div slot="popover" tip="popover">
                    <div style="height: 28px;line-height: 28px;padding-left: 6px;">提示信息</div>
                </div>
            </wu-plus-popover>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 主题自定义

开发者可以自定义 slot 的样式。

::: demo
```html
<template>
    <div style="display: flex; height: 100px; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-popover style="width: 160px" trigger="click" effect="dark">
            <wu-plus-button size="mini"  type="primary" >提示信息-修改样式</wu-plus-button>
            <div slot="popover" tip="popover">
                <div style="height: 28px;color:red;line-height: 28px;padding-left: 6px;">提示信息</div>
            </div>
        </wu-plus-popover>
    </div>
</template>
<script>
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| trigger | 触发方式 | String | click、hover、manual| click |
| position | 出现位置 | Placement | top-start、top-end、bottom-start、bottom-end、<br> right-start、right-end、left-start、 <br> left-end、top、bottom、left、right| bottom |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| popover  | 弹出层内容 |
| --  | 目标内容 |
