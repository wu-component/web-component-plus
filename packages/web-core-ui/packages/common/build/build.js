const shell = require('shelljs');
const { fsCopy } = require("./copy");
const { resolve } = require("path");
const getPath = _path => resolve(__dirname, _path)
shell.exec('tsc --noEmit', (code, stdout, stderr) => {
    if(code === 0) {
        console.log("基础库构建完成");
    }
    fsCopy(getPath('../src/dayjs'), getPath('../dist/dayjs'))
});
