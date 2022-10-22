
## Tree 树组件


### 基础用法

用清晰的层级结构展示信息，可展开或折叠。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree 
                height="200px"
                width="200px"
                options='{"label": "label"}'
                data='[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]'>
        </wu-plus-tree>
    </div>
</template>
<script>
</script>
```
:::


### 多节点选择

适用于需要选择层级时使用。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree 
                height="200px"
                select-type="checkbox"
                width="200px"
                options='{"label": "label"}'
                data='[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]'>
        </wu-plus-tree>
    </div>
</template>
<script>
</script>
```
:::

### 默认选中

可将 Tree 的某些节点设置为默认选中

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree 
                height="200px"
                select-type="checkbox"
                width="200px"
                default-checked-keys="[4, 9]"
                options='{"label": "label"}'
                data='[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]'>
        </wu-plus-tree>
    </div>
</template>
<script>
</script>
```
:::

### 单节点选择

适用于需要单选时使用。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree 
                height="200px"
                select-type="radio"
                width="200px"
                options='{"label": "label"}'
                data='[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]'>
        </wu-plus-tree>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--: |:--: |:--: |:--:  |:--: |
| data   | 树数据 | Array | --  | [] |
| height   | 高度 | String | --  | 400px |
| width   | 宽度 | String | --  | 300px |
| line-height   | 单行高度 | Number | --  | 32 |
| options   | 数据源配置 | DataOptions | --  | {id: 'id', label: 'label', disabled: 'disabled'} |
| select-type   | 树类型（多选树、单选树、普通树） | TypeEnums | 'checkbox'、'radio'、 false | false |
| default-checked-keys   | 默认勾选节点 | any[] | -- | [] |

### DataOptions

```
interface DataOptions {
    id: string;
    label: string;
    disabled: string;
}
```

### Event

| 事件名      | 说明 | 参数     |
|---------- |--|---------- |
| node-click | 节点点击 | (event: CustomEvent) => void |
| check-change | 节点勾选 | (event: CustomEvent) => void |

### Methods

| 方法                                                 | 描述                                         |
|----------------------------------------------------|--------------------------------------------|
| getChecked()                                       | 获取选中数据                                     |
| checkAll(justResult)                               | 选中全部,justResult为true则仅选择当前搜索结果             |
| clearAll()                                         | 清空所选项                                      |
| setCheckedKeys(keys)                               | 设置选中节点，keys为选中的节点id的数组                     |
| setCheckedNodes(nodes)                             | 设置选中节点，nodes为选中节点的数组                       |
| editNode(node)                                     | 编辑节点                                       |
| addNode(id,node)                                   | 添加节点,id:添加到的父节点id，当添加根节点时id为null,node新节点数据 |
| deleteNode(id)                                     | 删除节点                                       |
| getNodeById(id)                                    | 获取某个节点数据                                   |
| refreshDom(justScroll = false, needLocate = false) | 重新绘制                                       |
| destory                                            | 销毁实例，主要用于清除绑定事件                            |

