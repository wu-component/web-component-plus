## DatePicker 日期选择器

用于选择或输入日期

### 日期选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePicker" type="date"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 周选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerWeek" default="['2020-06-21', '2022-06-27']" type="week"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 周数选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerWeekNum" type="weeknum"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 月选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerMonth" type="month"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 年选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerYear" type="year"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 日期时间选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerDatetime" type="datetime"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 日期时间段选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker type="daterange" default="['2022-06-11', '2022-06-16']" id="timePickerDaterange"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 月时间段选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker type="monthrange" default="['2022-03-11', '2022-06-16']" id="timePickerManthrange"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 年时间段选择器

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker type="yearrange" default="['2020-06-11', '2022-06-16']" id="timePickeryearrange"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### 禁用

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-date-picker id="timePickerDisabled" disabled="true"></wu-plus-date-picker>
    </div>
</template>
<script>
</script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 选择器类型 | PickerType | 'year'、'month'、'date'、 'week'、'datetime'、、<br> 'datetimerange'、'daterange'、'monthrange'、'yearrange' 、 <br> | date |
| defaultValue | 时间值 | string、string[] | -- | -- |
| size | 组件大小 | UISize | medium、small、mini | mini |
| options | 配置项 | PickerOptions | -- | defaultOptions |

```
const defaultOptions = 
{
      type: 'date',
      multipleDates: [],
      startTime: dayjs().format('YYYY-MM-DD'),
      endTime: dayjs().format('YYYY-MM-DD'),
      maxDate: '',
      separator: ' 到 ',
      showType: 'modal',
      linkPanels: false,//面板联动
      showClear: true,//是否显示清除按钮
      autoConfirm: true,
      showShortKeys: false,
      shortList: [],
      showBottomButton: false,
      autoFillDate: true,//自动变更element里面的值
      disableDate: function(date, dayjs, calcType){//还未对初始时间做处理
         return false;
      },
}
```

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 值修改 | (event: CustomEvent) => void |

### PickerOptions

| 属性名      | 说明    |类型 |
|---------- |-------- |-------- |
