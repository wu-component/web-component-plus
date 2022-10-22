---
home: true
heroImage: /assets/logo.png
actions:
  - text: 快速上手
    link: /frame/log/changelog
    type: primary
    size: large
  - text: UI组件库
    link: /component-plus/log/changelog
    type: primary
    ghost: true
    size: large
features:
- title: 快速高效
  details: 可直接使用脚手架创建模板组件，采用装饰器定义组件，采用 JSX 编写视图代码。
- title: 数据驱动
  details: 组件内部实现了微型的数据响应式以及虚拟Dom，开发者开发组件时无需关心视图渲染更新。
- title: 跨框架、沙箱隔离
  details: 框架继承自 WebComponent，具有完善的 js、css 沙箱；react、vue、angular 还是原生项目均可使用。
footerWrap:
- headline: 🌿生态系统
  items:
  - title: Element UI
    link: https://element.eleme.cn/#/zh-CN
  - title: WebComponent
    link: https://www.webcomponents.org/
- headline: 💬社区交流
  items:
  - title: 讨论区
    link: https://github.com/wu-component/web-component-plus
  - title: 报告 Bug
    link: https://github.com/wu-component/web-component-plus
- headline: ☕开发
  items:
  - title: 掘金
    link: https://juejin.cn/user/1363050147888509
  - title: 博客
    link: https://blog.canyuegongzi.xyz
footer: MIT Licensed | Copyright © 2020-present Marvin.
  
---

## 创建组件

安装 t-cli 脚手架、创建组件模板工程：


```bash
## 安装脚手架
npm install @wu-component/t-cli -g

## 创建组件 <web-component-name> 为组件需要定义的组件名 此处按照 wu-todo-example 做示例
t init-web-component <web-component-name>

## 进入对应目录
cd wu-todo-example

## install
npm install
```

使用 yarn 也可以，如果你的网络环境不佳，推荐使用 cnpm。

## 开发组件

install 之后，你就可以直接 npm run dev:package 实时预览，即可就可以如 vue、react 工程般热更新开发.

### 开发示例

示例代码中实现了简易版的 TODO List 组件，代码如下以及效果如下：

### 实际效果

<div style="display: flex; justify-content: center; width: 100%">
    <wu-todo-example style="width: 70%"></wu-todo-example>
</div>

### 代码实现

```tsx
interface ToDoItem {
    text: string;
    status: 0 | 1;
}
@Component({
    name: 'wu-todo-example',
    css: css,
})
export class TestExample extends WuComponent implements OnInstall {
    constructor() {
        super();
    }

    @Prop({ default: [], type: Array })
    public list: ToDoItem[] = [];

    public inputRef = null;

    public submitTodo(e: MouseEvent) {
        e.preventDefault();
        this.addTodo();
    }

    public addTodo() {
        if (this.inputRef?.value) {
            const list: ToDoItem[] = [...this.list];
            list.push({
                text: this.inputRef?.value,
                status: 0
            });
            this.list = list;
            this.inputRef.value = '';
        }
    }

    public contextmenu(item: ToDoItem, index: number) {
        this.list.splice(index, 1);
        this.update();
    }

    public clickFun(item: ToDoItem, index: number) {
        const newList = this.list;
        if (newList[index]) {
            newList[index].status = newList[index].status === 1? 0: 1;
        }
        this.list = newList;
        this.update();
    }


    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <h1 class="caption">todos</h1>
                <form class="container" onsubmit={(e) => this.submitTodo(e)}>
                    <input class="input" id="input" placeholder="Enter your todo"></input>
                    <ul class="list">
                        {
                            this.list.map((item, index) => {
                                return (
                                    <li className={item.status === 1 ? "completed": "normal"}
                                        oncontextmenu={(item) => {this.contextmenu(item, index)}}
                                        onclick={(item) => {this.clickFun(item, index)}}
                                    >
                                        {item.text}
                                    </li>
                                )
                            })
                        }

                    </ul>
                </form>
                <div class="tips">鼠标左键单击切换状态、右键单击删除 </div>
            </div>
        );
    }

    public override connected(shadowRoot: ShadowRoot){
        this.inputRef = this.shadowRoot.querySelector("#input");
    }
}
```

### 组件使用

```html
<wu-todo-example></wu-todo-example>
```

## 组件构建

组件开发完成后可采用 npm run build:package 构建产物，最终产物如下：

```
dist
    index.cjs.js
    index.esm.js   // ES6 模块代码
    index.umd.js   // umd 模式
    index.d.ts
```

## 生产预览

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
    <wu-todo-example></wu-todo-example>
    <!---->
</div>
<!-- 引入构建后的产物 -->
<script src="./dist/index.umd.js"></script>
</body>
</html>
```
