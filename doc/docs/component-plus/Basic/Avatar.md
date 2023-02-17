
## Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

### 基础用法

通过 shape 和 size 设置头像的形状和大小。

::: demo
```html
<template>
    <div class="themeCodeContainer">
        <wu-plus-avatar size="60" fit="fill" shape="circle">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
        <wu-plus-avatar size="40" fit="fill" shape="circle">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
        <wu-plus-avatar size="24" fit="fill" shape="circle">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
       
        <wu-plus-avatar size="50" fit="fill" shape="square">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
        <wu-plus-avatar size="40" fit="fill" shape="square">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
        <wu-plus-avatar size="24" fit="fill" shape="square">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        </wu-plus-avatar>
    </div>
</template>
<script>
</script>
```
:::

### 展示类型

图片和字符。

::: demo
```html
<template>
    <div class="themeCodeContainer">
        <wu-plus-avatar size="60" fit="fill" shape="circle">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        </wu-plus-avatar>
        <wu-plus-avatar size="40" fit="fill" shape="circle">
            user
        </wu-plus-avatar>
    </div>
</template>
<script>
</script>
```
:::

### 图片如何适应容器框

当展示类型为图片的时候，使用 fit 属性定义图片如何适应容器框，同原生 object-fit。

::: demo
```html
<template>
    <div class="themeCodeContainer">
        <div v-for="fit in fits" :key="fit">
            <wu-plus-avatar size="60" :size="100" :fit="fit" :src="url">
            </wu-plus-avatar>
        </div>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        }
    }
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 设置头像的大小 | Number | - | - |
| src | 图片头像的资源地址 | String | - | - |
| shape | 设置头像的形状 | ShapeEnums | circle、square | circle |
| alt | 描述图像的替换文本 | String | -- | -- |
| fit | 当展示类型为图片的时候，设置图片如何适应容器框 | FitEnums | 'fill'、 'contain'、'cover' 、'none'、'scale-down' | cover |

### Event

| 事件名      | 说明    | 参数     | 
|---------- |-------- |---------- |
| error | 图片加载失败事件 | (event: CustomEvent) => void |
