const fs = require('fs');
const path = require('path');
const { resolve } = require("path");
const { readdirSync, readFile, writeFileSync } = require("fs");
const getPath = _path => resolve(__dirname, _path)

const input = resolve(__dirname, "../packages");

readdirSync(input)
    .filter(name => !["common", "ui", "common", "theme"].includes(name))
    .forEach(item => {
        fs.copyFileSync(getPath('./declaration.js'), getPath(`../packages/${item}/build/declaration.js`));
    })
