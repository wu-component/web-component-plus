const shell = require('shelljs');

const result = shell.exec('cross-env NODE_ENV=production tsc -p tsconfig.build.json && cross-env NODE_ENV=production tsc-alias -p tsconfig.build.json');
console.log(result);
if (result.code === 0) {
    console.log("tsc build success");
}
