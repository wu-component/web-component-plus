## Radio 单选

常用的单选框组件。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-radio label="男" value="medium" size="medium" name="medium" checked="true" @change="valueChange"></wu-plus-radio>
        <wu-plus-radio label="女" value="small" size="small" name="small" checked="true"></wu-plus-radio>
        <wu-plus-radio label="未知" value="mini" size="mini" name="mini" id="miniEvent1"></wu-plus-radio>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            valueChange(value) {
                console.log(value)
                alert(`值被修改:${JSON.stringify(value.detail)}`)
            }
        }
    }
</script>
```
:::

### 禁用状态

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-radio label="未知" value="mini" disabled="true" size="medium" name="mini" id="miniEvent1"></wu-plus-radio>
    </div>
</template>
<script>
</script>
```
:::

### 边框

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-radio label="未知" value="mini" border="true" size="medium" name="mini" id="miniEvent1"></wu-plus-radio>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 组件大小 | UISize | medium、small、mini | mini |
| disabled | 是否禁用 | Boolean |true, false | false |
| checked | 是否选中 | Boolean |true, false | false |
| checked | 是否选中 | Boolean |true, false | false |
| value | 值 | Boolean | true, false | false |
| border | 是否有边框 | Boolean | true, false | false |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
| mounted | 组件挂载 | (event: CustomEvent) => void |
