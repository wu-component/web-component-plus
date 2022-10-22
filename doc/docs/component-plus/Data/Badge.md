

## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法

展示新消息数量。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-badge value="200" max="99" type="waring">
            <wu-plus-button size="mini">评论</wu-plus-button>
        </wu-plus-badge>
        <wu-plus-badge value="90" max="99" type="primary">
            <wu-plus-button size="mini">回复</wu-plus-button>
        </wu-plus-badge>
        <wu-plus-badge value="5" max="99" type="danger">
            <wu-plus-button size="mini">回复</wu-plus-button>
        </wu-plus-badge>
    </div>
</template>
<script>
</script>
```
:::

### 最大值

可自定义最大值。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-badge value="200" max="100" type="waring">
            <wu-plus-button size="mini">评论</wu-plus-button>
        </wu-plus-badge>
        <wu-plus-badge value="15" max="20" type="primary">
            <wu-plus-button size="mini">回复</wu-plus-button>
        </wu-plus-badge>
    </div>
</template>
<script>
</script>
```
:::

### 自定义内容

可以显示数字以外的文本内容。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-badge value="new" type="waring">
            <wu-plus-button size="mini">评论</wu-plus-button>
        </wu-plus-badge>
        <wu-plus-badge value="hot" max="20" type="primary">
            <wu-plus-button size="mini">回复</wu-plus-button>
        </wu-plus-badge>
    </div>
</template>
<script>
</script>
```
:::

### 小红点

以红点的形式标注需要关注的内容。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-badge dot="true" type="waring">
           数据查询
        </wu-plus-badge>
        <wu-plus-badge dot="true" type="success">
            <wu-plus-button size="mini">回复</wu-plus-button>
        </wu-plus-badge>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数    | 说明                                         | 类型             | 可选值                                              | 默认值    |
|-------|--------------------------------------------|----------------|--------------------------------------------------|--------|
| value | 显示值                                        | String, Number | -                                                | -      |
| max   | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number         | -                                                | 100    |
| dot   | 小圆点                                        | Boolean        | true、false                                       | false  |
| hide  | 隐藏 badge                                   | Boolean        | true、false                                       | false  |
| type  | 类型                                         | TypeEnums      | 'primary'、 'success'、 'warning'、 'info'、'danger' | 'info' |
