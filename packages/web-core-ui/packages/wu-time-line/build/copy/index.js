

const { exists, copyDir} = require('./lib/copy')
const fs = require("fs");
const path = require("path");

const fsCopy = (sourcePath, deptPath)=> {
  exists(sourcePath,deptPath, copyDir)
}

function copyDirFun(srcDir, desDir, callback) {
    fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
        for (const file of files) {
            //判断是否为文件夹
            if (file.isDirectory()) {
                const dirS = path.resolve(srcDir, file.name);
                const dirD = path.resolve(desDir, file.name);
                //判断是否存在dirD文件夹
                if (!fs.existsSync(dirD)) {
                    fs.mkdir(dirD, (err) => {
                        if (err) console.log(err);
                    });
                }
                copyDir(dirS, dirD);
            } else {
                const srcFile = path.resolve(srcDir, file.name);
                const desFile = path.resolve(desDir, file.name);
                fs.copyFileSync(srcFile, desFile);
                callback()
            }
        }
    })
}
module.exports = {
  fsCopy,
  copyDirFun
}


