const download = require("download-git-repo");
const path = require("path");
const rimraf = require("rimraf");
const log = require('./log');
/**
 * 下载文件到目录
 * @param url
 * @param name
 * @param target
 * @returns {Promise<void>}
 */
async function downloadFile(url, name, target = process.cwd()) {
    return new Promise((resolve, reject) => {
        const dir = path.join(target, name);
        rimraf.sync(dir, {});
        const downLoadCallback = (err) => {
            if (err) {
                resolve({flag: false, dir, name});
                log('ERROR', err);
            }
            resolve({flag: true, dir, name});
        }
        download(url, dir, {clone: true}, downLoadCallback);
    })

}
module.exports = downloadFile;
