# web-webpack4-vue2-typescript

该模板是基于 webpack4 和 vue2 以及typescript 搭建，内部已经集成 eslint、router、vue-store、axios、各类样式预处理（less、sass、stylus）、模板引擎（pug）以及 webpack 打包分析配置。模板内部未集成任何第三方样式库，需要开发者自己扩展。

## 目录说明


```
├── build                                // webpack 配置目录
|——|—— webpack_build.config.js           // 生产环境配置
|——|—— webpack_common.config.js
|——|—— webpack_dev.config.js             // 开发环境配置 
|——|—— webpack_analyzer.config.js        // 打包分析配置
├── public                               // 公共文件目录
├──|—— index.html                        // html 模板
├── src                                  // 公共模块
├──|—— components                        // 公共组件目录
├──|—— router                            // 路由逻辑目录
├──|—— service                           // 网络请求逻辑目录
├──|—— store                             // vuex目录
├──|——|——module                          // vuex 各个子模块
├──|——|——index.js                        // vuex 根文件
├──|—— style                             // 样式
├──|—— utils                             // 工具目录
├──|—— views                             // 页面级组件目录
|——|—— main.js                           // 系统入口文件
|—— .eslintignore                        // eslint 忽略文件
|—— .eslintrc.js                         // eslint配置
|—— postcss.config                       // autoprefixer 配置
|—— tsconfig.json                        // ts 配置

```

## npm 脚本说明

### npm run webpack:dev

采用 webpack 方式启动工程工程。

### npm run webpack:build

采用 webpack 方式打包工程。

### npm run webpack:analyzer

该脚本用于 webpack 打包速度分析，控制台会打印出 各个模块的构建速度，也可以通过浏览器可视化分析各模块的体积占比。

## 说明

该模板是基于 vue2 + typescript 的集成，vuex 的使用以及使用案例详见 ```src/store/```、```views/home/HomeList.vue```， 其中注解使用了社区成熟的 ```vue-property-decorator``` 库
， vuex 采用 ```vuex-class + vuex-module-decorators``` 的方案。
