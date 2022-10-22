
## Image 图片

图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。

### 基础用法

可通过fit确定图片如何适应到容器框，同原生 object-fit。

::: demo
```html
<template>
    <div style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="display: flex;flex-direction: column">
            <span>fill</span>
            <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></wu-plus-image>
        </div>
        <div style="display: flex;flex-direction: column">
            <span>contain</span>
            <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="contain"></wu-plus-image>
        </div>
        <div style="display: flex;flex-direction: column">
            <span>cover</span>
            <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></wu-plus-image>
        </div>
        <div style="display: flex;flex-direction: column">
            <span>none</span>
            <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="none"></wu-plus-image>
        </div>
        <div style="display: flex;flex-direction: column">
            <span>scale-down</span>
            <wu-plus-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="scale-down"></wu-plus-image>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 占位内容

卡片可以只有内容区域。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;flex-wrap: wrap;justify-content: space-around;padding: 16px">
        <div style="display: flex;flex-direction: column">
            <span>默认</span>
            <wu-plus-image style="width: 300px; height: 200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" ></wu-plus-image>
        </div>

        <div style="display: flex;flex-direction: column">
            <span>自定义</span>
            <wu-plus-image style="width: 300px; height: 200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
                <div slot="placeholder" class="image-slot" style="display: flex;justify-content: center;align-items: center; width: 100%;height: 100%;background: #f5f7fa;color: #909399;">
                    加载中<span class="dot">...</span>
                </div>
            </wu-plus-image>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 加载失败

::: demo
```html
<template>
    <div style="display: flex; align-items: center;flex-wrap: wrap;justify-content: space-around;padding: 16px">
        <div style="display: flex;flex-direction: column">
            <span>默认</span>
            <wu-plus-image style="width: 300px; height: 200px"></wu-plus-image>
        </div>

        <div style="display: flex;flex-direction: column">
            <span>自定义</span>
            <wu-plus-image style="width: 300px; height: 200px">
                <div slot="error" class="image-slot-error" style="display: flex;justify-content: center;align-items: center; width: 100%;height: 100%;background: #f5f7fa;color: #909399;">
                    <wu-plus-icon name="picture-outline" style="font-size: 24px"></wu-plus-icon>
                </div>
            </wu-plus-image>
        </div>
    </div>
</template>
<script>
</script>
```
:::

### 大图预览

可通过 previewSrcList 开启预览大图的功能。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;flex-wrap: wrap;justify-content: space-around;padding: 16px">
        <wu-plus-image preview-src-list="['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']" style="width: 300px; height: 200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
            <div slot="placeholder" class="image-slot" style="display: flex;justify-content: center;align-items: center; width: 100%;height: 100%;background: #f5f7fa;color: #909399;">
                加载中<span class="dot">...</span>
            </div>
        </wu-plus-image>
    </div>
</template>
<script>
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | String | - | - |
| fit | 确定图片如何适应容器框，同原生 object-fit | String | fill、contain、cover、none、scale-down | -- |
| alt | 原生 alt | String | --| -- |
| z-index | 设置图片预览的 z-index | Number | -- | 2000 |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| error | 图片加载失败触发 | (event: CustomEvent) => void |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| placeholder  | 占位符，一般用作图片加载中 |
| error  | 加载错误占位符 |
