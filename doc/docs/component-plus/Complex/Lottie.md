## Lottie 动画

[Lottie](https://lottiefiles.com//)  是 Airbnb 开发的，一个适用于 Android、iOS、Web 和 Windows 的库，能够渲染 Adob​​e After Effects 动画特效。

wu-plus-lottie 是基于 lottie-web 重新进行了封装，开发者无需手动实例化 Lottie， 可如同普通 HTML 标签般接入。

### 基础用法

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="width: 300px; height: 300px">
            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_qynqmsel.json"></wu-plus-lottie>
        </div>
    </div>
</template>
<script>
</script>
<style>
</style>
```
:::

### 场景

很多场景中都可以使用组件，如空列表的数据。

::: demo
```html
<template>
    <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <div style="width: 300px; height: 300px">
            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/com/empty-list.json"></wu-plus-lottie>
        </div>  
    </div>
</template>
<script>
</script>
<style>
</style>
```
:::

### 动画控制——开始停止

可以通过 相关 Api 控制动画的开始停止，具体 Api 可[参考](https://lottiefiles.com//)。

::: demo
```html
<template>
    <div class="itemContainer_12">
        <div class="item_12">
            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_qynqmsel.json" :ref="onRef1"></wu-plus-lottie>
        </div>
        <div class="controlButton_12">
            <wu-plus-button type="primary" @click="onStart">开始</wu-plus-button>
            <span classe="currentSpeedText_12">动画中?{{this.isPlay.toString()}}</span>
            <wu-plus-button type="danger" @click="onStop">停止</wu-plus-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ref1: null,
                isPlay: true
            }
        },
        methods: {
            onStart() {
                this?.ref1.lottieInstance?.play();
                this.isPlay = true;
            },
            onStop() {
                this.ref1?.lottieInstance.stop();
                this.isPlay = false;
            },
            onRef1(ref) {
                this.ref1 = ref;
            },
        }
    }
</script>
<style>
    .item_12 {
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        padding: 18px;
    }
    .controlButton_12 {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex: 1;
        width: 100%;
    }
    .itemContainer_12 {
        width: 200px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        padding: 18px;
        margin: 0 auto;
    }
    .currentSpeedText_12 {
        font-size: 12px;
        font-weight: bold;
        line-height: 28px;
    }
</style>
```
:::

### 动画控制——加减速

可以通过 相关 Api 控制动画的加减速，具体 Api 可[参考](https://lottiefiles.com//)。

::: demo
```html
<template>
    <div class="itemContainer_12">
        <div class="item_12">
            <wu-plus-lottie data="https://qiniu.canyuegongzi.xyz/lf20_qynqmsel.json" :ref="onRef1"></wu-plus-lottie>
        </div>
        <div class="controlButton_12">
            <wu-plus-button type="primary" @click="onSpeedUp">加速</wu-plus-button>
            <span class="currentSpeedText_12">当前速度{{currentSpeed}}</span>
            <wu-plus-button type="danger" @click="onSpeedCut">减速</wu-plus-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ref1: null,
                currentSpeed: 1
            }
        },
        methods: {
            onSpeedUp() {
                if (this.currentSpeed === 10) {
                    webUIPlus.Message.setOption({
                        type: "warning",
                        message: "It's already fast, oh, it can't go any faster"
                    })
                    return;
                }
                this.ref1.lottieInstance.setSpeed(this.currentSpeed ++);
            },
            onSpeedCut() {
                if (this.currentSpeed === 1) {
                    webUIPlus.Message.setOption({
                        type: "warning",
                        message: "It's already too slow, oh, it can't be any slower"
                    })
                    return;
                }
                this.ref1.lottieInstance.setSpeed(this.currentSpeed --);
            },
            onRef1(ref) {
                this.ref1 = ref;
            },
        }
    }
</script>
<style>
    .item_12 {
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        padding: 18px;
    }
    .controlButton_12 {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex: 1;
        width: 100%;
    }
    .itemContainer_12 {
        width: 200px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        padding: 18px;
        margin: 0 auto;
    }
    .currentSpeedText_12 {
        font-size: 12px;
        font-weight: bold;
        line-height: 28px;
    }
</style>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 组件大小 | UISize | medium、small、mini | mini |
| autoplay | 是否自动播放 | Boolean | true、false | true |
| loop | 是否循环 | Boolean | true、false | true |
| renderer | 渲染类型 | String | svg、canvas、 html | svg |
| config | Lottie 其他配置项 | Object | 参考 Lottie | {} |

### Methods

| 方法名  | 说明    | 方法     | 
|--------|--------|---------- |
| start | 开始动画 | () => boolean |
| stop   | 结束动画 | () => boolean |
