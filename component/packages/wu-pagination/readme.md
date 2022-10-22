
## Pagination 分页

当数据量过多时，使用分页分解数据。

### 基础用法

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-pagination total='25' current-page='0' page-size='5'></wu-plus-pagination>
    </div>
</template>
<script>
</script>
```
:::

### 更多

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-pagination total='2003' current-page='1' page-size='5' id="testPagination"></wu-plus-pagination>
    </div>
</template>
<script>
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--: |:--: |:--: |:--:  |:--: |
| total  | 总数据量 | Number | --  | 0 |
| page-size  | 每页的条数 | Number | --  | 10 |
| current-page  | 当前页码 | Number | --  | 0 |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| change | 页码发生改变 | (event: CustomEvent) => void |

