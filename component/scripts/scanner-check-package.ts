const path = require("path");
const fs = require("fs-extra");
const utils = require("./check/utils")
const { getTargets, getPath, bytesToSize } = utils;
const packages = getPath(`../../packages`)
let targets = getTargets(packages);

const task = () => {
    targets = targets.filter(name => !["common", "ui", "common", "theme"].includes(name));
    const types = ["cjs", "esm", "umd"];
    const result = [];
    for (let i = 0; i < targets.length; i ++) {
        const typeResult = {}
        for (let j = 0; j < types.length; j ++) {
            const filePath = getPath(`${packages}/${targets[i]}/dist/index.${types[j]}.js`);
            const status = fs.statSync(`${packages}/${targets[i]}/dist/index.${types[j]}.js`, "utf-8");
            typeResult[types[j]] = {
                size: bytesToSize(status.size),
                format: types[j],
                file: `packages/${targets[i]}/dist/index.${types[j]}.js`
            };
        }
        // 版本信息
        const pkg = require(`${packages}/${targets[i]}/package.json`);
        const { dependencies, peerDependencies, version, name } = pkg;
        // 文件大小扫描
        result.push({
            name,
            version,
            directory: targets[i],
            file: typeResult,
            dependencies,
            peerDependencies: peerDependencies || {}
        });
    }
    const newResult = result.map(item => {
        let dependencies = Object.keys(item.dependencies).join(',');
        const peerDependencies = Object.keys(item.peerDependencies).map(item => item.split("/")[1]).join(',');
        if (item.directory === "ui") {
            dependencies = '*'
        }
        return {
            // name: item.directory,
            name: item.directory,
            version: item.version,
            esmSize: item.file.esm.size,
            umdSize: item.file.umd.size,
            dependencies: dependencies,
            // peerDependencies: peerDependencies,
        }
    })
    console.table(newResult);
    return result;
}

const run = () => {
    const result = task();
    // console.log(result);
    // bootstrap(result);
}

run();
