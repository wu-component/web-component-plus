const shell = require('shelljs');
const efs = require('fs-extra');
const path = require('path');
const { copySync, ensureDirSync, pathExists, removeSync } = efs;

const result = shell.exec('cross-env NODE_ENV=production BABEL_ENV=umd rollup -c ./rollup.config.js');
if (result.code === 0) {
    copySync(path.resolve(process.cwd(), './dist/src/packages'), path.resolve(process.cwd(), './types'))
    removeSync(path.resolve(process.cwd(), './dist/src'))
    console.log("tsc build success");
}
