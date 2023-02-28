## Tag 标签

用于标记和选择。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-tag type="primary" effect="light" id="tag-id1">标签一</wu-plus-tag>
    </div>
</template>
<script>
</script>
```
:::

### 可移除标签

通过点击标签关闭按钮后触发的 close 事件。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-tag type="primary" closable="true" effect="light" id="tag-id1">标签一</wu-plus-tag>
    </div>
</template>
<script>
</script>
```
:::

### 不同尺寸

Tag 组件提供除了不同尺寸，可以在不同场景下选择合适的尺寸。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-tag type="primary" size="mini" effect="dark" id="tag-id5">标签一</wu-plus-tag>
        <wu-plus-tag type="primary" size="medium" effect="dark" id="tag-id5">标签一</wu-plus-tag>
        <wu-plus-tag type="primary" size="small" effect="dark" id="tag-id5">标签一</wu-plus-tag>
    </div>
</template>
<script>
</script>
```
:::

### 不同主题

Tag 组件提供了三个不同的主题：dark、light 和 plain， 通过设置effect属性来改变主题。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-tag type="primary" effect="dark" id="tag-id9">标签一</wu-plus-tag>
        <wu-plus-tag type="primary" effect="light " id="tag-id10">标签二</wu-plus-tag>
        <wu-plus-tag type="primary" effect="plain " id="tag-id11">标签三</wu-plus-tag>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 类型 | TypeEnums | "success"、"info"、"warning"、 "danger"  | -- |
| effect  | 主题 | EffectEnums |"dark"、"light"、"plain"  | "light" |
| closable | 是否可关闭 | Boolean | true、false | false |
| disable-transitions | 是否禁用渐变动画 | Boolean | true、false | false |
| hit | 是否有边框描边 | Boolean | true、false | false |
| color | 背景色 | String | -- | -- |
| size | 组件大小 | UISize | medium、small、mini | mini |
| name | switch 对应的 name 属性 | String | -- | -- |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| click | 点击 Tag 时触发的事件 | (event: CustomEvent) => void |
| close | 关闭 Tag 时触发的事件 | (event: CustomEvent) => void |
