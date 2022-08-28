const shell = require('shelljs');
const { resolve } = require("path");
const { readdirSync } = require("fs");
const getPath = _path => resolve(__dirname, _path);

const input = resolve(__dirname, "../packages");

const taskList = [];
readdirSync(input)
    .filter(name => !["common", "ui", "common", "theme"].includes(name))
    .forEach(item => {
        shell.cd(getPath(`../packages/${item}`));
        shell.exec('cross-env NODE_ENV=production rollup -c ./build/build.js', (code, stdout, stderr) => {
            console.log(`${item} 构建完成`);
            resolve();
        });
        /*taskList.push(() => {
            return new Promise((resolve1, reject) => {
                shell.cd(getPath(`../packages/${item}`));
                shell.exec('cross-env NODE_ENV=production rollup -c ./build/build.js', (code, stdout, stderr) => {
                    console.log(`${item} 构建完成`);
                    resolve();
                });
            })
        })*/
    })
/*console.log(taskList);

for (let i = 0; i < taskList.length; i ++) {
    taskList[i]();
}*/
