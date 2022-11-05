const shell = require('shelljs');
const efs = require('fs-extra');
const path = require('path');
const { copySync, ensureDirSync, pathExists, removeSync } = efs;

const result = shell.exec('cross-env NODE_ENV=production rollup -c ./build/rollup.config.ts');
if (result.code === 0) {
    console.log("tsc build success");
}
