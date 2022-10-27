const shell = require('shelljs');

const shellBuildCommon = 'node ./scripts/build-common.js';
const shellBuildUi = 'pnpm -r exec pnpm run build:package';
const shellScannerPck = 'node ./scripts/scanner-check.js';

const result = shell.exec(shellBuildCommon);
if (result.code === 0) {
    console.log("common build success");
    const result1 = shell.exec(shellBuildUi);
    if (result1.code === 0) {
        const result2 = shell.exec(shellScannerPck);
        if (result2.code === 0) {
            console.log("开始扫描构建产物");
        }
    }
}
