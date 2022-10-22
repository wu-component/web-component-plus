## Transition 过渡动画

框架实现了部分组件的过渡动画。

### fade 淡入淡出

提供 wu-fade-in-linear 和 wu-fade-in 两种效果。

::: demo
```html
<template>
    <div style="display: flex; justify-content: center; flex-wrap: wrap; flex-direction: column; margin: 0 auto">
        <wu-plus-button id="transitionButton">Toggle</wu-plus-button>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
            <wu-plus-transition name="wu-fade-in-linear" id="transition1">
                <div class="transition-box">wu-fade-in-linear</div>
            </wu-plus-transition>
            <wu-plus-transition name="wu-fade-in" id="transition2">
                <div class="transition-box">wu-fade-in</div>
            </wu-plus-transition>
        </div>

    </div>
</template>
<script>
    export default {
        mounted() {
            document.getElementById("transitionButton").addEventListener('click', () => {
                const oTransition1 = document.getElementById('transition1');
                const oTransition2 = document.getElementById('transition2');
                oTransition1.toggle();
                oTransition2.toggle();
                // this.show = !this.show
            })
            document.getElementById('transition1').addEventListener('enter', () => {
                console.log("center")
            })
            document.getElementById('transition1').addEventListener('after-enter', () => {
                console.log("after-enter")
            })
            document.getElementById('transition1').addEventListener('leave', () => {
                console.log("leave")
            })

        }
    }
</script>
<style>
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        margin-right: 20px;
        box-sizing: border-box;
        margin-top: 10px;
    }
</style>
```
:::

### zoom 缩放

提供 wu-zoom-in-center，wu-zoom-in-top 和 wu-zoom-in-bottom 三种效果。

::: demo
```html
<template>
    <div style=" display: flex; flex-wrap: wrap; justify-content: center; flex-direction: column; margin: 0 auto">
        <wu-plus-button id="transitionButton2">Toggle</wu-plus-button>
        <div style="display: flex; flex-wrap: wrap;">
            <wu-plus-transition name="wu-zoom-in-center" id="transition3">
                <div class="transition-box">wu-zoom-in-center</div>
            </wu-plus-transition>
            <wu-plus-transition name="wu-zoom-in-top" id="transition4">
                <div class="transition-box">wu-zoom-in-top</div>
            </wu-plus-transition>
            <wu-plus-transition name="wu-zoom-in-bottom" id="transition5">
                <div class="transition-box">wu-zoom-in-bottom</div>
            </wu-plus-transition>
        </div>

    </div>
</template>
<script>
    export default {
        mounted() {
            document.getElementById("transitionButton2").addEventListener('click', () => {
                const oTransition3 = document.getElementById('transition3');
                const oTransition4 = document.getElementById('transition4');
                const oTransition5 = document.getElementById('transition5');
                oTransition3.toggle();
                oTransition4.toggle();
                oTransition5.toggle();
                // this.show = !this.show
            })

        }
    }
</script>
<style>
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        margin-right: 20px;
        box-sizing: border-box;
        margin-top: 10px;
    }
</style>
```
:::

### Event

| 事件名          | 说明            | 参数                            | 
|--------------|---------------|-------------------------------|
| before-enter | 	before-enter | 	(event: CustomEvent) => void |
| after-enter  | 	after-enter	 | (event: CustomEvent) => void  |
| enter	enter  | -	            | (event: CustomEvent) => void  |
| before-leave | 	before-leave | 	(event: CustomEvent) => void |
| after-leave  | after-leave   | 	(event: CustomEvent) => void |
| leave	       | leave         | 	(event: CustomEvent) => void |
