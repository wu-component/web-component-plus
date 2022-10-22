
## Collapse 折叠面板

通过折叠面板收纳内容区域。

### 基础用法

可同时展开多个面板，面板之间不影响。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-collapse style="width: 100%;" value="['1']" id="testCollapse">
            <wu-plus-collapse-item tip="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </wu-plus-collapse-item>

            <wu-plus-collapse-item tip="反馈 Feedback" name="2">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </wu-plus-collapse-item>
        </wu-plus-collapse>
    </div>
</template>
<script>
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--: |:--: |:--: |:--:  |:--: |
| value   | 当前激活的面板，必须为字符数组 | String[] | --  | [] |
| accordion  | 是否手风琴模式（暂未实现） | Boolean | true、false | false |


### Collapse Item Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--: |:--: |:--: |:--:  |:--: |
| name   | 唯一标志符 | String | --  | -- |
| tip   | 面板标题 | String | --  | -- |
| disabled  | 是否禁用 | Boolean | true、false | false |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 当前激活面板改变时触发) | (event: CustomEvent) => void |

### Collapse Item Slot

| 参数      | 说明    |
|---------- |-------- |
| --  | 内容 |
| title  | 自定义 header 内容 |

