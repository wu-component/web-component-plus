# 使用说明

wu-cli 是一个通用的快速构建开发环境的脚手架工具。
web端提供 webpack 基础版工程模板（js / ts）、vue2 + webpack(4 / 5)、react + webpack(4 / 5)；node 端默认提供基础版模板、nest工程级模板。

## 前置条件

wu-cli 对 node 最低要求是 v8.0， 最好是 12 以上。

## 安装

```bash
npm i @wu-component/wu-cli - g
// OR
yarn add @wu-component/wu-cli
```
## 使用

t-cli 可以通过```wu init <project_name> -c <web | server> -t <template_name>  ``` 快速构建出工程模板，其中```-c``` 为工程类型，可选值为 ```web``` 或 ```server```， ```-t``` 为模板名称，可选列表见模板列表。

```bash
// example:
wu init hello-world -c server -t node-nest
```

然后需要键入一些基本信息，不输入可以，一路回车即可。

```bash
? what's your name? dd
? please enter version? 1.0.0
? please enter description.
√ download success
√ create success

```
