const { resolve, join } = require("path");
const rimraf = require("rimraf");
const { readdirSync, readFileSync, readFile,  writeFileSync } = require("fs");
const getPath = _path => resolve(__dirname, _path)

const input = resolve(__dirname, "../packages");

readdirSync(input)
    .filter(name => !["common", "ui", "common", "theme"].includes(name))
    .forEach(item => {
        const rootPath = process.cwd();
        const target = join(rootPath, `./packages/${item}`);
        rimraf.sync(join(target, `./build/copy`));
        rimraf.sync(join(target, `./build/rm`));
        rimraf.sync(join(target, `./build/build.js`));
        rimraf.sync(join(target, `./build/declaration.js`));
    })
