## Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法

::: demo

```html

<template>
    <div style="display: flex; align-items: center;justify-content: space-evenly;padding: 16px">
        <wu-plus-cascader id="testCascader1"></wu-plus-cascader>
        <wu-plus-cascader id="testCascader2"></wu-plus-cascader>
    </div>
</template>
<script>
    const options=[{value:'zhinan',label:'指南',children:[{value:'shejiyuanze',label:'设计原则',children:[{value:'yizhi',label:'一致'},{value:'fankui',label:'反馈'},{value:'xiaolv',label:'效率'},{value:'kekong',label:'可控'}]},{value:'daohang',label:'导航',children:[{value:'cexiangdaohang',label:'侧向导航'},{value:'dingbudaohang',label:'顶部导航'}]}]},{value:'zujian',label:'组件',children:[{value:'basic',label:'Basic',children:[{value:'layout',label:'Layout 布局'},{value:'color',label:'Color 色彩'},{value:'typography',label:'Typography 字体'},{value:'icon',label:'Icon 图标'},{value:'button',label:'Button 按钮'}]},{value:'form',label:'Form',children:[{value:'radio',label:'Radio 单选框'},{value:'checkbox',label:'Checkbox 多选框'},{value:'input',label:'Input 输入框'},{value:'input-number',label:'InputNumber 计数器'},{value:'select',label:'Select 选择器'},{value:'cascader',label:'Cascader 级联选择器'},{value:'switch',label:'Switch 开关'},{value:'slider',label:'Slider 滑块'},{value:'time-picker',label:'TimePicker 时间选择器'},{value:'date-picker',label:'DatePicker 日期选择器'},{value:'datetime-picker',label:'DateTimePicker 日期时间选择器'},{value:'upload',label:'Upload 上传'},{value:'rate',label:'Rate 评分'},{value:'form',label:'Form 表单'}]},{value:'data',label:'Data',children:[{value:'table',label:'Table 表格'},{value:'tag',label:'Tag 标签'},{value:'progress',label:'Progress 进度条'},{value:'tree',label:'Tree 树形控件'},{value:'pagination',label:'Pagination 分页'},{value:'badge',label:'Badge 标记'}]},{value:'notice',label:'Notice',children:[{value:'alert',label:'Alert 警告'},{value:'loading',label:'Loading 加载'},{value:'message',label:'Message 消息提示'},{value:'message-box',label:'MessageBox 弹框'},{value:'notification',label:'Notification 通知'}]},{value:'navigation',label:'Navigation',children:[{value:'menu',label:'NavMenu 导航菜单'},{value:'tabs',label:'Tabs 标签页'},{value:'breadcrumb',label:'Breadcrumb 面包屑'},{value:'dropdown',label:'Dropdown 下拉菜单'},{value:'steps',label:'Steps 步骤条'}]},{value:'others',label:'Others',children:[{value:'dialog',label:'Dialog 对话框'},{value:'tooltip',label:'Tooltip 文字提示'},{value:'popover',label:'Popover 弹出框'},{value:'card',label:'Card 卡片'},{value:'carousel',label:'Carousel 走马灯'},{value:'collapse',label:'Collapse 折叠面板'}]}]},{value:'ziyuan',label:'资源',children:[{value:'axure',label:'Axure Components'},{value:'sketch',label:'Sketch Templates'},{value:'jiaohu',label:'组件交互文档'}]}]
    export default {
        mounted() {
            const testCascader1 = document.getElementById("testCascader1");
            const testCascader2 = document.getElementById("testCascader2");

            testCascader1.addEventListener('item-click', (e) => {
                console.log(e);
            })
            testCascader1.setAttribute('options', options);
            testCascader2.setAttribute('options', options);
        }
    }
</script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 数据项 | CascaderOption[] | -- | [] |
| value | 选中值 | string[] | -- | [] |
| disabled | 是否禁用 | Boolean |true, false | false |
| size | 组件大小 | UISize | medium、small、mini | mini |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| item-click | 值点击时触发 | (event: CustomEvent) => void |

### CascaderOption

| 属性名      | 说明    |类型 |
|---------- |-------- |-------- |
| value | 面板值 | string |
| label | 文字 | string |
| children | 子选项 | CascaderOption[] |
