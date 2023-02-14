const shell = require('shelljs');

const shellPublish = 'pnpm -r exec npm publish --access public';

const result = shell.exec(shellPublish);
if (result.code === 0) {
    console.log("publish build success");
}
