const fs = require('fs');
const path = require('path');
const { resolve } = require("path");
const { readdirSync, readFile, writeFileSync } = require("fs");
const getPath = _path => resolve(__dirname, _path)

const input = resolve(__dirname, "../packages");

/*readdirSync(input)
    .forEach(item => {
        fs.copyFileSync(getPath(`./index.test.js`), getPath(`../packages/${item}/test/index.test.js`));
    })*/

/*readdirSync(input)
    .forEach(item => {
        if (!fs.existsSync(getPath(`../packages/${item}/test`))) {
            fs.mkdirSync( getPath(`../packages/${item}/test`))
        }
    })*/

readdirSync(input)
    .forEach(item => {
        fs.rmSync(getPath(`../packages/${item}/index.test.js`));
    })
