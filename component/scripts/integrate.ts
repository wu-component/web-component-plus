import { readdirSync, openSync, writeSync, closeSync, readSync, readFileSync } from "fs";
import * as process from "process";
const shell = require('shelljs');
const efs = require('fs-extra');
const path = require('path');
const { ensureFileSync } = efs;
const packageSrcRoot = path.join(process.cwd(), './packages');
const componentNames =
    // 获取所有文件夹及文件
    readdirSync(packageSrcRoot, { withFileTypes: true })
    // 筛选出所有文件夹
    .filter((p) => p.isDirectory() && !["common", "theme", "ui"].includes(p.name))
    // 数据预处理
    .map((p) => ({
        path: `${p.name}/index`,
        name: p.name,
        typeFile: `${p.name}/types/index.d.ts`
    }));

const targetFile = path.join(process.cwd(), './types/index.d.ts')
ensureFileSync(targetFile);

console.log(componentNames);
async function getStr() {
    let str = '';
    let fileContent = `import { WuComponent, OnConnected, OnBeforeUpdate, OnBeforeRender, OnInstall, OnDisConnected } from "@wu-component/web-core-plus";
declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
declare type UISize = 'medium' | 'small' | 'mini';
declare type ShadowEnums = 'always' | 'hover' | 'never';\n`;
    for (let i = 0; i < componentNames.length; i ++) {
        const dir = path.join(process.cwd(), './packages', componentNames[i].typeFile);
        let result = readFileSync(dir, 'utf8');
        result = result.replace("export {};", '');
        result.split(/\r?\n/).forEach(line =>  {
            // declare type TypeEnums = 'primary' | 'success' | 'warning' | 'info' | 'danger';

            if (
                !(line.indexOf("@wu-component/web-core-plus") > -1) &&
                !(line.indexOf("import '@wu-component") > -1)  &&
                !(line.indexOf("declare type TypeEnums") > -1)  &&
                !(line.indexOf("declare type UISize") > -1)  &&
                !(line.indexOf("declare type ShadowEnums") > -1)  &&
                !(line.indexOf("types/type") > -1)  &&
                !(line.indexOf("export * from") > -1)  &&
                !(line.indexOf("from '@wu-component/web-core-plus';") > -1) &&
                !(line.indexOf("import {") > -1)
            ) {
                fileContent += line +'\n'
            }
        });
        // console.log(result);
    }
    return fileContent;
}

getStr().then(res => {
    const fd = openSync(targetFile , "w");
    const content = res;
    writeSync(fd, content);
    closeSync(fd);
})


