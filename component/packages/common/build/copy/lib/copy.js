const fs = require('fs')

/**
 * 复制一个文件夹下的文件到另一个文件夹
 * @param src 源文件夹，即需要写出的文件
 * @param dst 目标文件夹，需要写入的文件
 */
const copyDir = function (src, dst) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err
    }
    paths.forEach(function (path) {
      const _src = src + '/' + path
      const _dst = dst + '/' + path
      let readable;
      let writable
      fs.stat(_src, function (err, st) {
        if (err) {
          throw err
        }
        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src)
          // 创建写入流
          writable = fs.createWriteStream(_dst)
          // 通过管道来传输流
          readable.pipe(writable)
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copyDir)
        }
      })
    })
  })
}
/**
 * 在复制目录前需要判断该目录是否存在，
 * 不存在需要先创建目录
 * @param src
 * @param dst
 * @param callback
 */
const exists = function (src, dst, callback) {
  // 如果路径存在，则返回 true，否则返回 false。
  if (fs.existsSync(dst)) {
    callback(src, dst)
  } else {
    fs.mkdir(dst, function () {
      callback(src, dst)
    })
  }
}
/**
 * 判断数组中的元素是否包含此字符串
 * @param arr
 * @param obj
 * @returns {boolean}
 */
const contains = function (arr, obj) {
  let flag = false
  arr.map((val) => {
    if (obj.includes(val)) {
      flag = true
    }
  })
  return flag
}

module.exports = {
  exists,
  copyDir
}
