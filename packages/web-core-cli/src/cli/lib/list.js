const templateList = require('../config/template.json').templateList;
const log = require('../utils/log');
const category = 'category';
const query = 'query';
/**
 * 列出模板列表
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function list (options = {}, context = process.cwd()) {
    let projectCategory = options[category];
    let projectQuery = options[query];
    let templateLogList = templateList;
    if (projectCategory){
        templateLogList = templateList.filter(item => item.type === projectCategory);
    }
    if (projectQuery) {
        templateLogList = templateLogList.filter(item => item.name.indexOf(projectQuery) > -1)
    }
    for (let i = 0; i < templateLogList.length; i ++) {
        const str = `${templateLogList[i].name}`;
        log('TEXT', str );
    }
    if (!templateLogList.length) {
        log('WARING', 'No matching template !!!');
    }
    process.exit(0);
}
module.exports = (...args) => {
    return list(...args).catch(err => {})
}
