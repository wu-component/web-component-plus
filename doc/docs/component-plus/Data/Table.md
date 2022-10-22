
## Table 表格

用于展示多条结构类似的数据。

目前只实现了最基本的数据功能，和 ElementUI 尚有些差距，后期慢慢迭代。

### 基础用法

基础的表格展示用法。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-table
                checkbox="true"
                stripe="false"
                border="true"
                compact="false"
                data='[{"id":1,"name":"xwang","age":18,"address":"是是是"}]'
                columns='[{"title":"ID","key":"id","align":"center"},{"title":"Name","align":"center","key":"name"},{"title":"age","key":"age"},{"title":"address","key":"address"}]'
        ></wu-plus-table>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [{"id":1,"name":"xwang","age":18,"address":"是是是"}],
                columns: [{"title":"ID","key":"id", "align": "center"},{"title":"Name", "align": "center", "key":"name"},{"title":"age","key":"age"},{"title":"address","key":"address"}]
            }
        },
        methods: {
            
        }
    }
</script>
```
:::

### 自定义渲染

通过 render 实现自定义节点渲染，需要依赖  webCorePlus.h 实现，参考案例代码。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: space-around;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-table
                id="tableRef3"
                checkbox="true"
                stripe="false"
                border="true"
                compact="false"
                data="[]"
                columns="[]"
        ></wu-plus-table>

    </div>
</template>
<script>
    const editFun = (item, item1) => {
        console.log(item)
        console.log(item1)
    }
    const deleteFun = (item, item1) => {
        console.log(item)
        console.log(item1)
    }
    export default {
        data() {
            return {
            }
        },
        mounted() {
            const tableRef2 = document.getElementById("tableRef3");
            const columns = [
                { "title":"ID","key":"id","width":"80px", "align": "center" },
                { "title":"Name", "align": "center", "key":"name","width":"120px" },
                { "title":"age","key":"age","width":"120px" },
                { "title":"address","key":"address","width":"120px" },
                { "title": "操作", "width":"120px", "align": "center",
                    render: (item) => {
                        return webCorePlus.h('div', null, [
                            webCorePlus.h(
                                    'wu-plus-button', { size: "mini", type: "primary", style: { color: "blue", cursor: "pointer"}, onclick: (item1) => editFun(item, item1)}, '编辑'
                            ),
                            webCorePlus.h(
                                    'wu-plus-button', { size: "mini", type: "danger", style: { color: "blue", marginLeft: "8px", cursor: "pointer"}, onclick: (item1) => deleteFun(item, item1)}, '删除'
                            )
                        ])
                    }
                }
            ]
            const list = [
                {
                    "id":1,
                    "name":"xwang",
                    "age":18,
                    "address":"此处"
                },
                {
                    "id":2,
                    "name":"xwawwng",
                    "age":182,
                    "address":"急急急"
                },
                {
                    "id":3,
                    "name":"xwawwng",
                    "age":182,
                    "address":"以i"
                }
            ]
            this.$nextTick(() => {
                tableRef2.setAttribute('data', list)
                tableRef2.setAttribute('columns', columns)
            })


        }
    }
</script>
```
:::

### 多选

选择多行数据时使用 Checkbox。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;width: 100%; margin-top: 8px; margin-bottom: 16px">
        <wu-plus-table
                checkbox="true"
                stripe="false"
                border="true"
                compact="false"
                :data=data
                :columns="columns"
        ></wu-plus-table>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [{"id":1,"name":"xwang","age":18,"address":"是是是"}, {"id":2,"name":"xwang","age":18,"address":"是是是"}, {"id":3,"name":"xwang","age":18,"address":"是是是"}, {"id":4,"name":"xwang","age":18,"address":"是是是"}],
                columns: [{"width":"20px", "align": "center", "type": "selection"},{"title":"ID","key":"id", "align": "center"},{"title":"Name", "align": "center", "key":"name"},{"title":"age","key":"age"},{"title":"address","key":"address"}]
            }
        },
        methods: {

        }
    }
</script>
```
:::

### Attributes

<style>
</style>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | 组件数据 | any[] | 表格数据| [] |
| columns | 列配置 | Column[] | 符合 Column 的集合 | [] |
| border | 是否有边框 | Boolean | false、true | false |
| width | 宽度 | String | -- | 'auto' |
| height | 高度 | String | -- | 'auto' |


### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| selection-all | 当用户手动勾选全选 Checkbox 时触发的事件 | (event: CustomEvent) => void |
| cell-click | 当某个单元格被点击时会触发该事件 | (event: CustomEvent) => void |
| selection-change | 复选框行选择 | (event: CustomEvent) => void |

### Column Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 列类型 | ColumnEnums | 'selection'、'index'、'' | '' |
| title | 列名称, 类似 ElementUI 的 label | String | -- | -- |
| key | key 类似 ElementUI 的 prop | String | -- | -- |
| width | 宽度 | String | -- | -- |
| align | 对齐方式 | String | 'left'、'right'、'center' | 'left' |
