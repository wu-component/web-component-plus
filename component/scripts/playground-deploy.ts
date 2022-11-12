import { readdirSync, openSync, writeSync, closeSync, readSync, readFileSync } from "fs";
import * as process from "process";
const shell = require('shelljs');
const efs = require('fs-extra');
const fs = require('fs');
const path = require('path');
const { ensureFileSync, copyFileSync } = efs;
const packageSrcRoot = path.join(process.cwd(), './packages');

const html = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html {
            width: 100vw;height:100vh;
        }
    </style>
    [[__script__]]
</head>
<body style="width: 100%;height: 100%;margin: 0;">
    <wu-code-playground style="width: 100%;height: 100%"></wu-code-playground>
</body>
</body>
</html>`
const fileMap = {
    'web-core-plus': {
        from: "../packages/web-core-plus/dist/index.umd.js",
        to:  "playground/static/web-core-plus/index.umd.js",
    },
    'wu-lottie': {
        from: "packages/wu-lottie/dist/index.umd.js",
        to:  "playground/static/wu-lottie/index.umd.js",
    },
    'wu-code-monaco-editor': {
        from: "packages/wu-code-monaco-editor/dist/index.umd.js",
        to:  "playground/static/wu-code-monaco-editor/index.umd.js",
    },
    'wu-code-sandbox': {
        from: "packages/wu-code-sandbox/dist/index.umd.js",
        to:  "playground/static/wu-code-sandbox/index.umd.js",
    },
    'wu-code-playground': {
        from: "packages/wu-code-playground/dist/index.umd.js",
        to:  "playground/static/wu-code-playground/index.umd.js",
    }
}
function deploy() {
    const packages = path.resolve(__dirname, '../packages');
    const keys = Object.keys(fileMap);
    let script = ``;
    for (let i = 0; i < keys.length; i ++) {
        ensureFileSync(path.resolve(__dirname, '../', fileMap[keys[i]].to));
        copyFileSync(path.resolve(__dirname, '../', fileMap[keys[i]].from), path.resolve(__dirname, '../', fileMap[keys[i]].to));
        script += `<script src="./static/${keys[i]}/index.umd.js"></script>\n`
    }

    const fd = openSync(path.resolve(__dirname, '../playground', 'index.html'), "w");
    const content = html.replace('[[__script__]]', script);
    writeSync(fd, content);
    closeSync(fd);

}

deploy()
