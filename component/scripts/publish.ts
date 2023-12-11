/*
const shell = require('shelljs');

const shellPublish = 'pnpm -r exec npm publish --access public';

const result = shell.exec(shellPublish);
if (result.code === 0) {
    console.log("publish build success");
}
*/
const shell = require('shelljs');
const path = require("path");
const fs = require("fs-extra");
const utils = require("./check/utils")
const { getTargets, getPath, bytesToSize } = utils;
const packages = getPath(`../../packages`)
let targets = getTargets(packages);

const task = () => {
    targets = targets.filter(name => !["common", "theme"].includes(name));
    const successList = []
    const failList = []

    for (let i = 0; i < targets.length; i ++) {
        try {
            const filePath = getPath(`${packages}/${targets[i]}`);
            const pcg = require(`${packages}/${targets[i]}/package.json`);
            const { version, name } = pcg
            const shellPublish = `cd ${filePath} && npm publish --access public`;
            //const shellPublish = `cd ${filePath}`;
            const result = shell.exec(shellPublish);
            if (result.code === 0) {
                console.log(`${name}@${version}publish success`);
                successList.push({
                    name,
                    version,
                    errMsg: null
                })
            } else {
                failList.push({
                    name,
                    version,
                    errMsg: '发布失败'
                })
            }
        }catch (e) {

        }
    }


    console.log(`publish success components(${successList.length})`)
    console.table(successList);
    console.log(`publish fail components(${failList.length})`)
    console.table(failList);
}

task()
