## DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间，详细配置见上一章节 DatePicker 。

<a-alert message="DateTimePicker 由 DatePicker 和 TimePicker 派生，Picker Options 或者其他选项可以参照 DatePicker 和 TimePicker。目前该框架下 DateTimePicker 与 DatePicker 为同一个组件。" type="info" show-icon />

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
