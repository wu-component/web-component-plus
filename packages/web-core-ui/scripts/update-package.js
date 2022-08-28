const { resolve } = require("path");
const { readdirSync, readFileSync, readFile,  writeFileSync } = require("fs");
const getPath = _path => resolve(__dirname, _path)

const input = resolve(__dirname, "../packages");

readdirSync(input)
    .filter(name => !["common", "ui", "common", "theme"].includes(name))
    .forEach(item => {
        readFile(getPath(`../packages/${item}/package.json`), (err, data) => {
            if (err) {
                console.log("err", err);
            }
            data = JSON.parse(data.toString());
            data = {
                ...data, ...{
                    "files": [
                        "dist",
                        "src",
                        "LICENSE",
                        "types",
                        "readme.md"
                    ],
                    "types": "./types/index.d.ts",
                    "main": "./dist/index.cjs.js",
                    "module": "./dist/index.esm.js",
                    "browser": "./dist/index.umd.js",
                    "scripts": {
                        "format": "prettier --write \"{src,apps,libs,test}/**/*.{tsx,ts}\"",
                        "lint": "eslint \"{src,apps,libs,test}/**/*.{tsx,ts}\" --fix",
                        "test": "jest -c packages/web-ui/jest.config.js",
                        "example:package": "live-server",
                        "build:package": "cross-env NODE_ENV=production rollup -c ./build/build.js  && node build/declaration.js",
                        "dev:package": "webpack serve --config ./build/webpack_dev.config --env development --mode development --hot"
                    },
                    "publishConfig": {
                        "access": "public"
                    },
                }
            }
            writeFileSync(getPath(`../packages/${item}/package.json`), JSON.stringify(data, null, 4), err => {
                if (err) {
                    console.log("修改失败", err);
                }
            });
        });
    })
