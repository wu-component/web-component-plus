# node-simple-typescript

该模板基于 typescript + node 的简易版开发、调试环境。

## 目录说明

```
├── src                                  // 公共模块
|——|—— main.ts                           // 系统入口文件
|——|—— .eslintignore                     // eslint 忽略文件
|——|—— .eslintrc.js                      // eslint配置
|——|—— nodemon-debug.json                // 调试配置
|——|—— package.json                      // 开发配置
|——|—— tsconfig.json                     // ts 构建配置

```
## npm 脚本说明

### npm run start:dev

该脚本用于在开发环境启动工程，模板已经配置好热更新。

### npm run start:debug

该脚本用于在开发环境中以断点调试 typescript 代码。

### npm run build

该脚本用于打包构建工程代码。

