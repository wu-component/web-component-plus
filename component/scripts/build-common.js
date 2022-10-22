const shell = require('shelljs');
const { resolve } = require("path");
const getPath = _path => resolve(__dirname, _path)
shell.cd(getPath("../packages/common"));
shell.exec('node ./build/build.js', (code, stdout, stderr) => {
    console.log(code);
});
