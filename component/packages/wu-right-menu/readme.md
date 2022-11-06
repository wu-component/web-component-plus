
## WuRightMenu 右键菜单

右键自定义菜单。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-right-menu id="rateTest7" list='[{"name":"保存"},{"name":"另存为"},{"name":"放弃此次修改"},{"name":"设置","menu":[{"name":"首选项"},{"name":"快捷键"}]}]'>ssssssss</wu-right-menu>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数   | 说明   | 类型    | 可选值 | 默认值 |
|------|------|-------|-----|----|
| list | 菜单列表 | strin | --  | '[]' |

### Event

| 事件名      | 说明    | 参数                                        | 
|---------- |-------- |-------------------------------------------|
| menuclick | 值修改 | (event: CustomEvent.detail<Menu>) => void |
