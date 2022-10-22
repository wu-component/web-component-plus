
## Timeline 时间线

可视化地呈现时间流信息。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-timeline>
            <wu-plus-timeline-item timestamp="2018-04-15">
                活动按期开始
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-13">
                通过审核
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-12">
                创建成功
            </wu-plus-timeline-item>
        </wu-plus-timeline>
    </div>
</template>
<script>
</script>
```
:::

### 自定义节点类型

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-timeline>
            <wu-plus-timeline-item timestamp="2018-04-15" type="primary">
                活动按期开始
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-13" type="success">
                通过审核
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-12" type="warning">
                创建成功
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-12" type="danger">
                创建成功1
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-12" type="info">
                创建成功2
            </wu-plus-timeline-item>
        </wu-plus-timeline>
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
        <wu-plus-timeline>
            <wu-plus-timeline-item timestamp="2018-04-15" color="blue">
                活动按期开始
            </wu-plus-timeline-item>
            <wu-plus-timeline-item timestamp="2018-04-13" color="green">
                通过审核
            </wu-plus-timeline-item>
        </wu-plus-timeline>
    </div>
</template>
<script>
</script>
```
:::

### wu-plus-timeline Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 类型 | TypeEnums | "success"、"info"、"warning"、 "danger"  | -- |

### wu-plus-timeline-item Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| timestamp  | 时间戳 | String | --  | -- |
| hide-timestamp  | 是否隐藏时间戳 | Boolean | true、false | false |
| placement  | 时间戳位置 | String | 'top' 、 'bottom' | 'bottom' |
| type  | 节点类型 | String | 'primary'、'success'、'warning'、'danger'、'info' | -- |
| color  | 节点颜色 | String | -- | -- |
| color  | 节点颜色 | String | -- | -- |

### wu-plus-timeline-item Slot

| 参数      | 说明    |
|---------- |-------- |
| dot  | 自定义节点 |

