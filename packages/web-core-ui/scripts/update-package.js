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
            const data1 = {
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
                        "test": "web-test-runner \"./test/*.js\" --node-resolve",
                        "example:package": "live-server",
                        "build:package": "cross-env NODE_ENV=production rollup -c ./build/build.js  && node build/declaration.js",
                        "dev:package": "webpack serve --config ./build/webpack_dev.config --env development --mode development --hot"
                    },
                    "publishConfig": {
                        "access": "public"
                    },
                    "repository": {
                        "type": "git",
                        "url": "https://github.com/wu-component/web-component-plus"
                    },
                    "devDependencies": {
                        "@open-wc/testing": "^3.1.6",
                        "@web/test-runner": "^0.13.28",
                        "rollup-plugin-livereload": "^2.0.5",
                        "rollup-plugin-serve": "^2.0.1",
                        "chalk": "4.1.2",
                        ...data.devDependencies
                    },
                    "dependencies": {
                        ...data.dependencies,
                        "@wu-component/common": "latest",
                        "@wu-component/web-core-plus": "latest"
                    },
                }
            }
            writeFileSync(getPath(`../packages/${item}/package.json`), JSON.stringify(data1, null, 4), err => {
                if (err) {
                    console.log("修改失败", err);
                }
            });
        });
    })
