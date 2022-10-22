## 快速入门

### npm 安装

现代前端工程化的开发模式下，推荐使用 npm 的方式安装，方便通过 ES Module 方式引入组件。

```bin

npm install @wu-component/wu-core-router

```

### link 引入

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--引入底层库-->
    <script src="https://unpkg.com/@wu-component/web-core-plus"></script>
    <!--引入路由插件-->
    <script src="https://unpkg.com/@wu-component/wu-core-router"></script>
</head>
<body>
<div id="app">
    <!--路由占位插槽-->
    <wu-plus-router-view></wu-plus-router-view>
</div>
<script >
    const homeComponent = `
            <div style="height: 100%">
                 <div class="button-container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-around;padding: 16px">
                     <wu-plus-button size="mini" type="primary">primary</wu-plus-button>
                     <wu-plus-button size="mini" type="success">success</wu-plus-button>
                     <wu-plus-button size="mini" type="warning">warning</wu-plus-button>
                     <wu-plus-button size="mini" type="danger">danger</wu-plus-button>
                     <wu-plus-button size="mini" type="info">info</wu-plus-button>
                     <wu-plus-button size="mini" type="text">text</wu-plus-button>
                 </div>
            </div>
    `
    const aboutComponent = `
            <div style="height: 100%">
                  <div style="display: flex; align-items: center; flex-direction: column; padding: 16px">
                      <wu-plus-progress style="width: 350px" percentage="70"></wu-plus-progress>
                      <span style="height: 16px"></span>
                      <wu-plus-progress style="width: 350px" percentage="60" color="red"></wu-plus-progress>
                      <span style="height: 16px"></span>
                      <wu-plus-progress style="width: 350px" percentage="50" color="yellow"></wu-plus-progress>
                  </div>
            </div>
    `
    const myComponent = `
            <div style="height: 100%">
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
            </div>
    `
    const messageComponent = `
            <div style="height: 100%">
                <div style="display: flex; align-items: center;justify-content: center;padding: 16px">
                    <wu-plus-collapse style="width: 100%;" value="["1"]" id="testCollapse">
                        <wu-plus-collapse-item tip="一致性 Consistency" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </wu-plus-collapse-item>
                        <wu-plus-collapse-item tip="反馈 Feedback" name="2">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </wu-plus-collapse-item>
                    </wu-plus-collapse>
                </div>
            </div>
    `

    const options = {
        type: 'hash',
        after: (e) => {
            return true
        },
        before: (e) => {
            return true;
        },
        routers: [
            {
                path: '/home',
                element: homeComponent
            },
            {
                path: '/about',
                element: aboutComponent
            },
            {
                path: '/my',
                element: myComponent
            },
            {
                path: '/message',
                element: messageComponent
            }
        ]
    };
    window.router = new wuRouter.Router(options);
</script>

</body>
</html>

```
