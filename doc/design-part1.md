## 前言

经过一段儿时间对之前 web-core-plus 的架构进行了重新梳理、重构，并在此基础了实现了大部分 ElementUI 的样式组件以及 Api，统一封装成新的 WebComponent 组件库 web-plus-ui。

相关资料

- [官方文档](https://wu-component.github.io/)

- [项目组织](https://github.com/wu-component)

- [代码仓库](https://github.com/wu-component/web-component-plus)

- [WIP(web-core-plus)：点击查阅 core 库进度](https://web.banlikanban.com/kanban/628b2b6eceb11d7b004930af/欢迎查看板栗看板「component-core」)

- [WIP(web-ui-plus)：点击查阅 UI 库进度](https://web.banlikanban.com/kanban/628b2b93ceb11d7b00493195/欢迎查看板栗看板「component-ui」)

- npm包(后面考虑换名）
    - @canyuegongzi/web-core-plus
    - @canyuegongzi/web-ui-plus

## 相关介绍

### 什么是 web component？

在此再多啰嗦几句，为之前不是很了解此技术栈的读者简单灌输一下概念。

> web component是web原生提供的封装组件的方式，让开发者定义一些可重复使用的自定义元素。主要包含custom elements、shadow dom、html templates部分，分别用于注册自定义元素、提供shadow-dom接口，为自定义元素的样式和脚本提供一个隔离的环境、通过template和slot编写自定义元素的结构模板。

### 关于

目前架构基于 WebComponent 提供了一套更加完善的 Api，用户可基于该框架快速创建出 WebComponent。

目前该框架主体分为两部分：

* web-core-plus 是底层的依赖包，主要为提供虚拟 DOM、属性、事件、生命周期钩子函数定义等功能；

* web-ui-plus 是基于 web-core-plus 实现的一套标准的 WebComponent 组件库，其中样式继承自 ElementUI，与 ElementUI、Ant Design 的区别在于该 UI 不依赖于任何的框架（vue、react、angular等），只需一个 ```<script src=""></script>``` 就能使用优雅的样式和丰富的 Api，同时也不影响在 vue、react 中使用。

### 特性

* 便捷高效
    - 可直接使用脚手架创建模板组件，采用装饰器定义组件，采用 JSX 编写视图代码。
* 数据响应
    - 组件内部实现了微型的响应式框架，开发者开发组件时无需关心视图渲染更新。
* 沙箱隔离
    - 框架继承自 WebComponent，具有完善的 js、css 沙箱。

## 架构介绍

### 整体架构

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/wu-component-design.1653812380716.png"/></p>

目前整个体系如上图所示，整体包括底层的 Core 架构包、基于 Core 机构包的 UI 组件库、脚手架 CLI，以及后续计划的 Route、Store 等一系列的扩展插件。

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/decorators.1653812643946.png"/></p>

上图的类图中基本标注了些 Core 架构对外提供的一些 Api 装饰器。

### 渲染流程

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/Component-line.1653812930067.png"/></p>

目前的架构，内部实现了一个微型的响应式前端框架，包括数据劫持、JSX 解析、Diff、批量异步更新等现代框架的功能，开发者也可以根据框架抛出的生命周期钩子函数手动干预渲染任务调度。

浏览器解析到自定义 HTML 标签后，组件内部会初始化一些配置项，包括标签的属性、事件等，初始化完成后会先根据默认（绑定的 Attr 属性）的值进行一次渲染流程，渲染流程内部和 react、vue 等现代框架类似，先将 JSX 通过 h 函数转换为虚拟 dom，后续进入 diff 流程进行最小化的 Dom 更新，其中有非常重要的一环，批量异步更新可以尽可能的减少更新操作（此特性正在开发中）。 

## 快速上手

### 创建组件

安装 t-cli 脚手架、创建组件模板工程：

```bash
## 安装脚手架
npm install @canyuegongzi/t-cli -g
## 创建组件 <web-component-name> 为组件需要定义的组件名 此处按照 test-web-core-component 做示例
t init-web-component <web-component-name>
## 进入对应目录
cd test-web-core-component
## install
npm install
```

使用 yarn 也可以，如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 开发组件

install 之后，你就可以直接 `npm run dev:package` 实时预览，即可就可以如 vue、react 工程般热更新开发

<p align="center"><img src="https://qiniu.canyuegongzi.xyz/example-web-component.png"/></p>
<p align="center"><img src="https://qiniu.canyuegongzi.xyz/web-component-see1.png"/></p>

### 组件构建

组件开发完成后可采用 `npm run build:package` 构建产物，最终产物如下：

```
dist
    index.cjs.js
    index.esm.js   // ES6 模块代码
    index.umd.js   // umd 模式
    index.d.ts
```

### 生产预览

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <!-- 自定义标签 -->
    <wu-test-example></wu-test-example>
    <!---->
</div>
<!-- 引入构建后的产物 -->
<script src="./dist/index.umd.js"></script>
</body>
</html>
```

## Decorators API 介绍

通过注解快速创建 WebComponent 组件。

### Component

该注解用于快速定义组件，内部实现了一些较为底层的逻辑，包括各类生命周期钩子函数、虚拟dom、dom事件等。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
}
```

#### Api

```ts
interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    options?: ElementDefinitionOptions;
}
```

### Emit

该装饰器用于自定义 dom 事件，底层基于 CustomEvent 实现。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
    
    @Emit('change')
    private change() {
        return {
            value: this.checked,
            name: this.name,
            label: this.label,
        };
    }
}

```

#### Api

Emit 必须传入事件名

### Watch

该装饰器用于组件内部的监听。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
    
    @Watch('checked')
    public checkedChange(val: any, oldVal: any) {}
    
}

```

#### Api

Watch 目前仅支持一个参数，为需要监听的属性，函数包含俩参数新值和旧值。

### Prop

该装饰器用于定义 Attribute。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
    @Prop({ default: false, type: Boolean })
    public disabled: boolean;
    
}

```

#### Api

```ts
export interface PropOptions {
    default?: any;
    type?: PropTyp;
}
```

### Inject

Inject 需要和 Provide 配套使用，Inject 用于接收父级组件注入的数据。

#### Example

如案例中从父级组件中接受 wuFormRef 数据，最常见的需求如在定义 Form 表单时，单个表单列需要拿到 Form 组件实例（类似 ElForm 组件）。

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
    
    @Inject("wuFormRef")
    public wuForm;
}
```

#### Api

Inject 必须传入需要接收的变量名称。

### Provide

Provide 需要和 Inject 配套使用，Inject 用于向子孙组件注入数据。

#### Example

如示例中向子孙组件注入一个名为 wuFormRef 的数据。

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends HTMLElement {
    constructor() {
        super();
    }
    
    @Provide("wuFormRef")
    public provideParentDescTitle() {
        return this;
    }
}
```

#### Api

Provide 的装饰对象必须是一个函数，该函数必须要有返回值，返回注入的数据。

### State

...待实现

## UI 库

在此列举了目前实现的一些组件，具体实现感兴趣的可移步到官网查阅（官网已做移动端适配奥）。

[官方文档](https://wu-component.github.io/)

* wu-plus-button
* wu-plus-icon
* wu-plus-radio
* wu-plus-input
* wu-plus-row
* wu-plus-col
* wu-plus-checkbox
* wu-plus-checkbox-group
* wu-plus-switch
* wu-plus-link
* wu-plus-table
* wu-plus-tag
* wu-plus-progress
* wu-plus-breadcrumb
* wu-plus-breadcrumb-item
* wu-plus-page-header
* wu-plus-rate
* wu-plus-time-line
* wu-plus-time-line-item
* wu-plus-select
* wu-plus-select-option
* wu-plus-avatar
* wu-plus-empty
* wu-plus-card
* wu-plus-popover
* wu-plus-message

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/progress-comnponent.1653815768790.png"/></p>

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/select-component.1653815796988.png"/></p>

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/table-component.1653815825005.png"/></p>

<p align="center"><img src="http://qiniu.canyuegongzi.xyz/time-line-component.1653815825032.png"/></p>


## 总结

目前该项目只能算是第一阶段完成了收尾，后续还需要不断的优化，不断的新增新的自定义组件，尤其是当下前端开发中通用的组件，诸如流程图绘制，GiS 组件、树组件等，以减少因为 vue、react 不用框架造成的 UI 层面的壁垒。

对 WebComponent 技术栈感兴趣的开发可点击下方链接查阅详细的文档，有想参与一起共建该技术栈的开发者可联系笔者一起参与。

[参与共建](https://wu-component.github.io/dev/)
