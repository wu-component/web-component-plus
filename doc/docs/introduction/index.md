## 概述

### 体验

[在线体验](https://stackblitz.com/edit/github-ku3ijk?file=src/index.tsx)

### 什么是 web component？

web component是web原生提供的封装组件的方式，让开发者定义一些可重复使用的自定义元素。主要包含custom elements、shadow dom、html templates部分，分别用于注册自定义元素、提供shadow-dom接口，为自定义元素的样式和脚本提供一个隔离的环境、通过template和slot编写自定义元素的结构模板。

### 关于 WuComponent

WuComponent 基于 WebComponent 提供了一套更加完善的 Api，用户可基于该框架快速创建出 WebComponent。

目前该框架主体介绍：

* web-core-plus： 是底层的依赖包，主要为提供虚拟 DOM、属性、事件、生命周期钩子函数定义等功能；

* web-core-ui： 是基于 web-core-plus 实现的一套标准的 WebComponent 组件库，其中样式继承自 ElementUI，与 ElementUI、Ant Design 的区别在于该 UI 不依赖于任何的框架（vue、react、angular等），只需一个 <script src=""></script> 就能使用优雅的样式和丰富的 Api，同时也不影响在 vue、react 中使用；

* web-core-cli： 是快速创 WebComponent 组件的脚手架；

* wu-core-router： 是基于 web-core-plus 的路由插件。

### 架构示意

<img src="https://qiniu.canyuegongzi.xyz/wu-component-design.1655621087372.png" class="medium-zoom medium-zoom-image">

### 渲染示意

<img src="http://qiniu.canyuegongzi.xyz/Component-line.1653812930067.png" class="medium-zoom medium-zoom-image">
