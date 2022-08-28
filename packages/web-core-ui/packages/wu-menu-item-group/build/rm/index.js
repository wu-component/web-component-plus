const fs = require('fs')
const path = require("path");
function deleteall(path) {
    let files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            // console.log(file);
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
function findFile(path, findName) {
    let filesAll = [];
    if (fs.existsSync(path)) {
        filesAll = fs.readdirSync(path);
        filesAll.forEach((fileItem,index) => {
            let findCurrPath = path + '/' + fileItem;
            if (fileItem == findName) {
                deleteall(findCurrPath);
                findFile(path,findName);
            } else {
                if(fs.statSync(findCurrPath).isDirectory()) { // recurse
                    findFile(findCurrPath,findName);
                }
            }
        })
    }
}

module.exports = {
    deleteall
}
