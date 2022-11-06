const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const getPath = _path => path.resolve(__dirname, _path);

const getTargets = (packages) => {
    // 读取 packages 目录下需要打包的目录
    try {
        return fs
            .readdirSync(packages)
            .filter((f) => {
                if (["common"].includes(f)) {
                    return false
                }
                if (!fs.statSync(`${packages}/${f}`).isDirectory()) {
                    return false;
                }
                const pkg = require(`${packages}/${f}/package.json`);
                if (pkg.private && !pkg.buildOptions) {
                    return false;
                }
                return true;
            });

   }catch (e) {
        return []
    }
}
// 模糊匹配需要打包的 package name
const fuzzyMatchTarget = (partialTargets, includeAllMatching, targets) => {
    const matched = [];
    partialTargets.forEach((partialTarget) => {
        for (const target of targets) {
            if (target.match(partialTarget)) {
                matched.push(target);
                if (!includeAllMatching) {
                    break;
                }
            }
        }
    });
    if (matched.length) {
        return matched;
    } else {
        console.log();
        console.error(
            `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(
                `Target ${chalk.underline(partialTargets)} not found!`
            )}`
        );
        console.log();

        process.exit(1);
    }
};

/**
 * 文件大小
 * @param bytes
 * @returns {string}
 */
const bytesToSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

module.exports =  {
    fuzzyMatchTarget,
    getTargets,
    getPath,
    bytesToSize
}
