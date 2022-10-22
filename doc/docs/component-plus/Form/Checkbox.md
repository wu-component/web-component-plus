## Checkbox 多选

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-checkbox label="测试4"></wu-plus-checkbox>
    </div>
</template>
<script>
</script>
```
:::

### 禁用

多选框不可用状态。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-checkbox value="false" disabled="true" id="switchId1">测试</wu-plus-checkbox>
    </div>
</template>
<script>
</script>
```
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-checkbox-group value="['测试1']" id="checkoutBoxGroup">
            <wu-plus-checkbox label="测试1" style="margin-right: 8px"></wu-plus-checkbox>
            <wu-plus-checkbox label="测试2" style="margin-right: 8px"></wu-plus-checkbox>
            <wu-plus-checkbox label="测试3"></wu-plus-checkbox>
        </wu-plus-checkbox-group>
    </div>
</template>
<script>
</script>
```
:::

### indeterminate 状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-checkbox label="测试4" style="margin-right: 8px" indeterminate="true" id="indeterminate2"></wu-plus-checkbox>
        <wu-plus-checkbox-group value="['测试1']" id="checkoutBoxGroup2">
            <wu-plus-checkbox label="测试1" style="margin-right: 8px"></wu-plus-checkbox>
            <wu-plus-checkbox label="测试2" style="margin-right: 8px"></wu-plus-checkbox>
            <wu-plus-checkbox label="测试3"></wu-plus-checkbox>
        </wu-plus-checkbox-group>
    </div>
</template>
<script>
    let _groupIndex = 0
    const _groupValueList = [["测试1", "测试2"], ["测试1", "测试3"], ["测试1"], ["测试3"]]
    export default  {
        data() {
            return {
                indeterminate: false,
                value: ['测试1']
            }
        },
        mounted() {
            // 代码有些啰嗦，简单实现关联多选框选择
            const indeterminate = document.getElementById("indeterminate2");
            const checkoutBoxGroup = document.getElementById("checkoutBoxGroup2");
            indeterminate.addEventListener('change', (e) => {
                console.log(e.detail);
                if (e.detail.value) {
                    checkoutBoxGroup.setAttribute("value", ['测试1', '测试2', '测试3'])
                    indeterminate.setAttribute("indeterminate", "")
                    indeterminate.setAttribute("checked", true)
                } else {
                    indeterminate.setAttribute("indeterminate", "")
                    checkoutBoxGroup.setAttribute("value", [])
                    indeterminate.setAttribute("checked", false)
                }
            })
            checkoutBoxGroup.addEventListener("change", (e) => {
                const value = checkoutBoxGroup.getAttribute("value");
                if (value.length === 0) {
                    indeterminate.setAttribute("indeterminate", false)
                    indeterminate.setAttribute("checked", false);
                    return
                }
                if (value.length < 3) {
                    indeterminate.setAttribute("indeterminate", true)
                    return;
                }
                if (value.length === 3) {
                    indeterminate.setAttribute("indeterminate", false)
                    indeterminate.setAttribute("checked", true)
                }
                
            })
        }
    }
</script>
```
:::


### checkbox Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked  | 是否选中 | Boolean | true、false  | -- |
| disabled | 禁用 | Boolean | true、false | false |
| indeterminate | 中间态 | Boolean | true、false | false |
| size | 组件大小 | UISize | medium、small、mini | mini |
| name | name | String | -- | -- |
| label | label | String | -- | -- |


### checkbox Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |


### checkbox-group Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 值 | Array | --  | -- |
| disabled | 禁用 | Boolean | true、false | false |
| size | 组件大小 | UISize | medium、small、mini | mini |


### checkbox-group Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
