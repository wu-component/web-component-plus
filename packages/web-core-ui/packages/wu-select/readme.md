
## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-select id="select1">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
    </div>
</template>
<script>
</script>
```
:::

### 禁用状态

选择器不可用状态

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-select id="select3" disabled="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
    </div>
</template>
<script>
</script>
```
:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-select id="select678" clearable="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
        <wu-plus-select id="select765" clearable="true" multiple="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
    </div>
</template>
<script>
</script>
```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-select id="select72" multiple="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
        <wu-plus-select id="select73" multiple="true" collapseTags="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
    </div>
</template>
<script>
</script>
```
:::


### 可搜索

可以利用搜索功能快速查找选项。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-select id="select10" filterable="true">
            <wu-plus-select-option label="item-item1" value="1"></wu-plus-select-option>
            <wu-plus-select-option label="item-item2" value="2"></wu-plus-select-option>
            <wu-plus-select-option label="item-item3" value="3"></wu-plus-select-option>
        </wu-plus-select>
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
| value | 选择的值 | String、Array |-- | -- |
| multiple | 是否多选 | Boolean |true, false | false |
| clearable | 是否清除 | Boolean |true, false | false |
| collapseTags | 多选下是否折叠tag | Boolean |true, false | false |
| placeholder | placeholder | String |--| -- |
| filterable | 是否可搜索 | Boolean |true, false | false |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
| clear | 清除 | (event: CustomEvent) => void |
