const shell = require('shelljs');

const shellBuildCommon = 'ts-node ./scripts/build-common.ts';
const shellBuildPackage = 'pnpm -r exec pnpm run build:package';
const shellScannerPck = 'ts-node ./scripts/scanner-check-package.ts';

const result = shell.exec(shellBuildCommon);
if (result.code === 0) {
    console.log("common build success");
    try {
        const result1 = shell.exec(shellBuildPackage);
        if (result1.code === 0) {
            const result2 = shell.exec(shellScannerPck);
            if (result2.code === 0) {
                console.log("开始扫描构建产物");
            }
        }
    }catch (e) {
        console.warn(e);
    }

}
