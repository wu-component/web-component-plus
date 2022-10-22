
## Tree-v2 树组件

### 基础用法

用清晰的层级结构展示信息，可展开或折叠。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree-v2 draggable="false" show-checkbox="false" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
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
        <wu-plus-tree-v2 draggable="false" show-checkbox="true" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
    </div>
</template>
<script>
</script>
```
:::

### 默认选中

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree-v2 draggable="false" show-checkbox="true" node-key="value" id="tree1" default-checked-keys="['1']" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
    </div>
</template>
<script>
</script>
```
:::

### 默认展开

可将 Tree 的某些节点设置为默认展开子节点。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree-v2 draggable="false" default-expanded-keys="['1', '1.1']" show-checkbox="true" node-key="value" id="tree1" default-checked-keys="['1']" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
    </div>
</template>
<script>
</script>
```
:::

### 节点高亮

highlight-current 属性可以取消节点的选中高亮。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
        <wu-plus-tree-v2 draggable="false"  highlight-current="false" show-checkbox="true" node-key="value" id="tree1" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数                    | 说明                                                                    | 类型        | 可选值          | 默认值    |
|-----------------------|-----------------------------------------------------------------------|-----------|--------------|--------|
| data                  | 	树数据                                                                  | 	Array    | 	--          | 	[]    |
| highlight-current     | 	是否高亮                                                                 | 	Boolean  | 	false、true  | 	true  |
| default-expand-all    | 	是否默认展开所有节点                                                           | 	Boolean	 | false、true   | 	false |
| expand-on-click-node  | 	是否在点击节点的时候展开或者收缩节点， 默认值为 true，</br> 如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | 	Boolean  | 	false、true  | 	true  |
| check-on-click-node   | 	是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                          | 	Boolean  | 	false、true  | 	false |
| default-checked-keys  | 	默认选中的节点 key                                                          | 	Array    | 	--          | 	[]    |
| auto-expand-parent	   | 展开子节点的时候是否自动展开父节点                                                     | 	Boolean  | 	false、true  | 	true  |
| default-expanded-keys | 	默认展开的节点的 key 的数组                                                     | 	Array    | 	--          | 	[]    |
| show-checkbox         | 	节点是否可被选择                                                             | 	Boolean  | 	false、true	 | false  |
| indent                | 	相邻级节点间的水平缩进，单位为像素                                                    | 	Number   | 	--          | 	18    |
| node-key	             | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                            | 	String   | 	--          | 	--    |
| node-key	             | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                            | 	String   | 	--          | 	--    |
| empty-text	           | 内容为空的时候展示的文本	                                                         | String	   | --	          | --     |

### Options

| 事件名      | 说明                               | 参数      | 
|----------|----------------------------------|---------|
| label	   | 指定节点标签为节点对象的某个属性值                | 	String |
| children | 	指定子树为节点对象的某个属性值                 | 	String |
| disabled | 	指定节点选择框是否禁用为节点对象的某个属性值          | 	String |
| isLeaf   | 	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | 	String |

### Event

| 事件名             | 说明             | 参数                            | 
|-----------------|----------------|-------------------------------|
| node-click	     | 节点点击           | 	(event: CustomEvent) => void |
| check-change    | 	节点勾选	         | (event: CustomEvent) => void  |
| current-change	 | 当前选中节点变化时触发的事件 | 	(event: CustomEvent) => void |
| node-expand	    | 节点被展开时触发的事件	   | (event: CustomEvent) => void  |
| node-collapse   | 	节点被关闭时触发的事件	  | (event: CustomEvent) => void  |

### Methods

| 事件名               | 说明                                                                     | 
|-------------------|------------------------------------------------------------------------|
| getCurrentNode()  | 	获取当前被选中节点的 data，若没有节点被选中则返回 null                                      |
| setCurrentNode()  | 	通过 node 设置某个节点的当前选中状态，</br> 使用此方法必须设置 node-key 属性((node) 待被选节点的 node) |
| setCurrentKey()   | 	通过 key 设置某个节点的当前选中状态，使用此方法必须设置                                        |
| node-key          | 属性((key) 待被选节点的 key，若为 null 则取消当前高亮的节点)                                |
| getNode()         | 	根据 data 或者 key 拿到 Tree 组件中的 node                                      |
| getCheckedNodes() | 	若节点可被选择（即 show-checkbox 为 true），</br> 则返回目前被选中的节点所组成的数组               |
| setCheckedNodes() | 	设置目前勾选的节点，使用此方法必须设置 node-key 属性                                       |
| getCheckedKeys()	 | 若节点可被选择（即 show-checkbox 为 true），</br> 则返回目前被选中的节点的 key 所组成的数组          |
| getCurrentNode()	 | 获取当前被选中节点的 data，若没有节点被选中则返回 null                                       |

### DataOptions

```ts
interface DataOptions {
    value: string;
    label: string;
    disabled: string;
}
```
