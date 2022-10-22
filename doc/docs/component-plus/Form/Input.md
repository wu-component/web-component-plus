## Input 输入框

常用的输入框组件。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-input style="width: 280px" maxLength="10" disabled="false" placeholder="请输入" type="input"></wu-plus-input>
    </div>
</template>
```
:::

### 禁用状态

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-input style="width: 280px" maxLength="10" disabled="true" placeholder="请输入" clearable="true" type="input"></wu-plus-input>
    </div>
</template>
<script>
</script>
```
:::

### 清除按钮

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-input style="width: 280px" maxLength="10" placeholder="请输入" clearable="true" type="input"></wu-plus-input>
    </div>
</template>
```
:::

### 文本域

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-input style="width: 280px" rows="2" disabled="false" maxLength="20" placeholder="请输入" clearable="false" type="textarea"></wu-plus-input>
    </div>
</template>
```
:::



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 组件大小 | UISize | medium、small、mini | mini |
| disabled | 是否禁用 | Boolean |true, false | false |
| clearable | 是否清除 | Boolean |true, false | false |
| value | 输入框值 | String | -- | -- |
| type | 类型 | String | textarea、input | input |
| placeholder | placeholder | String | -- | -- |
| suffixIcon | suffixIcon | String | -- | -- |
| name | name | String | -- | -- |
| form | form | String | -- | -- |
| prefixIcon | prefixIcon | String | -- | -- |
| maxLength | 最大长度 | Number | -- | -- |
| minLength | 最小长度 | Number | -- | -- |
| rows | 行数，仅文本域有用 | Number | -- | -- |
| autoComplete | 是否补全 |Boolean |true, false | false |
| onBlur | 失去焦点 |Function |-- | -- |
| onFocus | 获取焦点 |Function |-- | -- |
| onInput | 用户输入 |Function |-- | -- |
| onChange | 值修改 |Function |-- | -- |
| onMouseEnter | 鼠标移入 |Function |-- | -- |
| onMouseLeave | 鼠标离开 |Function |-- | -- |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |
| blur | 失去焦点 | (event: CustomEvent) => void |
| focus | 获取焦点 | (event: CustomEvent) => void |
| input | 用户输入 | (event: CustomEvent) => void |
