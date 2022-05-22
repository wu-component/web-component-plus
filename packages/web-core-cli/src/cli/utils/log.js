const chalk = require('chalk')
const error = chalk.bold.red;
const warning = chalk.yellow;
const success = chalk.hex('#67c23a');
const text = chalk.bold;
/**
 * 日志打印
 * @param type
 * @param str
 */
function log(type, str) {
    switch (type) {
        case 'SUCCESS':
            console.log(success(str));
            break;
        case 'WARING':
            console.log(warning(str));
            break;
        case 'ERROR':
            console.log(error(str));
            break
        case 'TEXT':
            console.log(text(str));
            break
        default:
            console.log(str);
    }

}
module.exports = log;
