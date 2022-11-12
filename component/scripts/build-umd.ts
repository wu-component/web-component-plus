const shell = require('shelljs');

const shellBuildUmd = 'pnpm --filter @wu-component/ui-plus -r exec pnpm run build:package:umd';
const shellScannerUmd = 'ts-node ./scripts/scanner-check-umd.ts';

const result1 = shell.exec(shellBuildUmd);
if (result1.code === 0) {
    const result2 = shell.exec(shellScannerUmd);
    if (result2.code === 0) {
        console.log("开始扫描构建产物");
    }
}
