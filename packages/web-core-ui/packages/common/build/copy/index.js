

const { exists, copyDir} = require('./lib/copy')

const fsCopy = (sourcePath, deptPath)=> {
  exists(sourcePath,deptPath, copyDir)
}

module.exports = {
  fsCopy
}


