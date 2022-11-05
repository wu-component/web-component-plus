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
            // "build": "node ./node_modules/@wu-component/wu-build-tools/dist/index.js --input ./src/index.tsx --operate BUILD",
            // "cross-env NODE_ENV=production rollup -c ./build/build.js  && node build/declaration.js",
            const data1 = {
                ...data, ...{
                    "files": [
                        "dist",
                        "src",
                        "LICENSE",
                        "types",
                        "readme.md"
                    ],
                    "exports": {
                        ".": {
                          "types": "./types/index.d.ts",
                          "require": "./dist/index.cjs.js",
                          "import": "./dist/index.esm.js"
                        },
                        "./*": "./*",
                    },
                    "sideEffects": true,
                    "types": "./types/index.d.ts",
                    "main": "./dist/index.cjs.js",
                    "module": "./dist/index.esm.js",
                    "browser": "./umd/index.umd.js",
                    "scripts": {
                        "format": "prettier --write \"{src,apps,libs,test}/**/*.{tsx,ts}\"",
                        "lint": "eslint \"{src,apps,libs,test}/**/*.{tsx,ts}\" --fix",
                        "test": "web-test-runner \"./test/*.js\" --node-resolve",
                        "example:package": "live-server",
                        "build:package": "node ./node_modules/@wu-component/wu-build-tools/dist/index.js --input ./src/index.tsx --operate BUILD",
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
                        "@wu-component/wu-build-tools": "latest",
                        "process": "^0.11.10",
                        "rollup-plugin-filesize": "^9.1.1",
                        "rollup-plugin-node-externals": "^2.2.0",
                        "rollup-plugin-postcss": "^4.0.2",
                        "rollup-plugin-progress": "^1.1.2",
                        "rollup-plugin-scss": "^3.0.0",
                        "rollup-plugin-terser": "^7.0.2",
                        "rollup-plugin-typescript2": "^0.31.2",
                        "rollup-plugin-visualizer": "^5.6.0",
                        "@rollup/plugin-commonjs": "^19.0.2",
                        "@rollup/plugin-inject": "^4.0.4",
                        "@rollup/plugin-json": "^4.1.0",
                        "@rollup/plugin-node-resolve": "^13.1.3",
                        "@rollup/plugin-replace": "^4.0.0",
                        "@rollup/plugin-typescript": "^8.3.1",
                        "@rollup/plugin-url": "^6.1.0",
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
