
## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 基础用法

Progress 组件设置percentage属性即可，表示进度条对应的百分比，必填，必须在 0-100。

::: demo
```html
<template>
    <div style="display: flex; align-items: center; flex-direction: column; padding: 16px">
        <wu-plus-progress style="max-width: 350px;width: 85%;" percentage="70"></wu-plus-progress>
        <span style="height: 16px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" percentage="60" color="red"></wu-plus-progress>
        <span style="height: 16px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" percentage="50" color="yellow"></wu-plus-progress>
    </div>
</template>
<script>
</script>
```
:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;flex-direction: column;padding: 16px">
        <wu-plus-progress style="max-width: 350px;width: 85%;" text-inside="true" stroke-width="26" percentage="70" color="#409eff"></wu-plus-progress>
        <span style="height: 16px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" text-inside="true" stroke-width="26" percentage="60" color="green"></wu-plus-progress>
        <span style="height: 16px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" text-inside="true" stroke-width="26" percentage="50" color="red"></wu-plus-progress>
        <span style="height: 16px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" text-inside="true" stroke-width="26" percentage="50" color="#e6a23c"></wu-plus-progress>
    </div>
</template>
<script>
</script>
```
:::

### 自定义颜色、粗细

可以通过 color 设置进度条的颜色，通过 stroke-width 定义粗细。

::: demo
```html
<template>
    <div style="display: flex; align-items: center;flex-direction: column;padding: 16px">
        <wu-plus-progress style="max-width: 350px;width: 85%;" show-text="false" text-inside="false" stroke-width="26" percentage="70" color="#409eff"></wu-plus-progress>
        <span style="height: 8px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" show-text="false" text-inside="false" stroke-width="20" percentage="60" color="green"></wu-plus-progress>
        <span style="height: 8px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" show-text="false" text-inside="false" stroke-width="16" percentage="50" color="red"></wu-plus-progress>
        <span style="height: 8px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" show-text="false" text-inside="false" stroke-width="10" percentage="50" color="#e6a23c"></wu-plus-progress>
    </div>
</template>
<script>
</script>
```
:::

### 环形进度条

Progress 组件可通过 type 属性来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。

::: demo
```html
<template>
    <div style="display: flex; width: 80%; margin: 0 auto; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-progress type="circle" id="progressCircleId1" percentage="0"></wu-plus-progress>
        <span style="height: 8px"></span>
        <wu-plus-progress type="circle"  text-inside="true" stroke-width="6" percentage="60" color="green"></wu-plus-progress>
        <span style="height: 8px"></span>
        <wu-plus-progress style="max-width: 350px;width: 85%;" type="dashboard" id="progressCircleId19" percentage="25"></wu-plus-progress>
    </div>
</template>
<script>
</script>
```
:::

### 仪表盘形进度条

::: demo
```html
<template>
    <div style="display: flex; width: 400px; max-width: 80%;margin:0 auto; align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-progress style="max-width: 350px;width: 85%;" type="circle" id="progressCircleId10" percentage="25"></wu-plus-progress>
        <span style="height:8px"></span>
        <div style="display: flex;flex-direction: row;">
            <wu-plus-button size="mini" type="primary" id="progressButton1">+</wu-plus-button>
            <wu-plus-button size="mini" type="success" id="progressButton2" style="margin-left: 16px;">-</wu-plus-button>
        </div>
    </div>
</template>
<script>
    let num = 25
    export default {
        mounted() {
            const progressButton1 = document.getElementById("progressButton1");
            const progressButton2 = document.getElementById("progressButton2");
            const progressCircleId1 = document.getElementById("progressCircleId10");
            progressButton1.addEventListener("click", () => {
                num = num + 5
                if (num >= 100) {
                    num = 100
                }
                progressCircleId1.setAttribute("percentage", num)
            })

            progressButton2.addEventListener("click", () => {
                num = num - 5
                if (num <= 0) {
                    num = 0
                }
                progressCircleId1.setAttribute("percentage", num)
            })
        }
    }
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| percentage  | 百分比（必填 0 —— 100 ） | number | 0-100  | 0 |
| type | 进度条类型 | TypeEnums | "line" 、 "circle" 、 "dashboard" | "line" |
| stroke-width	 | 进度条的宽度，单位 px | number | -- | 6 |
| text-inside	 | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | true、false | false |
| color	 | 进度条背景色 | String | -- | -- |
| width	 | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | Number | -- | 126 |
| show-text	 | 是否显示进度条文字内容 | Boolean | true、false | true |
| stroke-linecap	 | circle/dashboard 类型路径两端的形状 | StrokeLinecapEnums |  "butt"、 "round"、"square" | "round" |
