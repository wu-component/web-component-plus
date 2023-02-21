const utils = require("./check/utils")
const { getTargets, getPath, bytesToSize } = utils;
const packages = getPath(`../../packages`)
let targets = getTargets(packages);

console.log(targets);
