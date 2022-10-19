const fs = require('fs');
const path = require('path');
const { copyDirFun, fsCopy } = require("./copy");
const { resolve } = require("path");
const { deleteall } = require("./rm");
const getPath = _path => resolve(__dirname, _path)

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err, "读取文件夹错误！")
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                const filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        const isFile = stats.isFile(); //是文件
                        const isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            if (filedir.indexOf(".d.ts") > -1) {
                                fs.copyFileSync(filedir, getPath(`../types/${filename}`));
                                fs.unlinkSync(filedir);
                            }
                        }
                        if (isDir) {
                            if (filename === 'src') {
                                fs.copyFileSync(`${filedir}/index.d.ts`, getPath(`../types/index.d.ts`));
                                deleteall(filedir);
                            }else {
                                fsCopy(filedir,  getPath(`../types/${filename}`), () => {
                                    // deleteall(filedir);
                                })
                            }

                        }
                    }
                })
            });
        }
    });
}

fileDisplay(getPath('../dist'))

