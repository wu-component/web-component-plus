const templateList = require('../config/template.json').templateList;
const categoryList = require('../config/category.json').categoryList;
const log = require('../utils/log');
const inquirer = require('inquirer');
const fs = require("fs");
const ora = require('ora');
const downloadFile = require("../utils/download");
const template = 'template';
const category = 'category';
const isTest = process.env.NODE_ENV;
/**
 * 初始化工程模板
 * @param pluginToAdd
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function init (pluginToAdd, options = {}, context = process.cwd()) {
    let projectCategory = options[category]
    let projectTemplate = options[template]
    let projectName = pluginToAdd;
    if (!options.hasOwnProperty(category)){
        projectCategory = await selectCategory()
    }
    if (!options.hasOwnProperty(template)){
        projectTemplate = await selectTemplate(projectCategory)
    }
    const templateInfo = templateList.find((item) => item.type === projectCategory && item.name === projectTemplate);
    if (!templateInfo) {
        return log('WARING', 'no template');
    }
    const {url} = templateInfo;
    const packageInfo = await getUserInputPackageMessage(projectName);
    const downloadSpinner = ora({ text: 'start download template...', color: 'blue'}).start();
    const {dir, name, flag} = await downloadFile(url[0], projectName, context)
    if (flag) {
        downloadSpinner.succeed('download success');
        const editConfigSpinner = ora({ text: 'start edit config...', color: 'blue'}).start();
        // 下载完成后修改配置信息
        const successFlag = await downloadSuccess(dir, name, packageInfo);
        if (successFlag) {
            editConfigSpinner.succeed('create success');
        }else {
            editConfigSpinner.fail('create fail');
        }
    } else {
        downloadSpinner.fail('download fail');
    }
}

/**
 * 选择工程类型
 * @returns {Promise<void>}
 */
async function selectCategory() {
    return new Promise(resolve => {
        inquirer.prompt([
            { type: 'list', message: 'please select category:', name: category, choices: categoryList }
        ]).then((answers) => {
            console.log(answers);
            resolve(answers[category])
        })
    })
}

/**
 * 选择工程模板名称
 * @returns {Promise<void>}
 */
async function selectTemplate(projectCategory) {
    try {
        const list = templateList.filter(item => item.type === projectCategory).map((item) => item.name)
        if (!list.length || !list) {
            return log('WARING', 'no template');
        }
        return new Promise(resolve => {
            inquirer.prompt([
                { type: 'list', message: 'please select template:', name: template, choices: list }
            ]).then((answers) => {
                resolve(answers[template])
            })
        })
    }catch (e){
        log('ERROR', e);
    }

}

/**
 * 模板下载成功
 * @param dir
 * @param name
 * @param packageInfo
 * @returns {Promise<void>}
 */
async function downloadSuccess(dir, name, packageInfo) {
    return new Promise((resolve) => {
        fs.readFile(dir + '/package.json', 'utf8', (err, data) => {
            if (err) {
                resolve(false);
            }
            const packageFile = {...JSON.parse(data), ...packageInfo}
            fs.writeFile(dir + '/package.json', JSON.stringify(packageFile, null, 4), 'utf8', (err) => {
                if (err) {
                    resolve(false);
                }
                resolve(true);
            });
        })
    })
}

/**
 * 用户自己输入一些配置信息
 * @param name
 * @returns {Promise<void>}
 */
async function getUserInputPackageMessage(name) {
    return new Promise(async (resolve, reject) => {
        if(isTest) {
            return resolve({name, author: '', description: '', version: '1.0.0' })
        }
        try {
            const messageInfoList = await Promise.all([
                inquirer.prompt([
                    { type: 'input', message: "what's your name?", name: 'author', default: '' },
                    { type: 'input', message: "please enter version?", name: 'version', default: '1.0.0' },
                    { type: 'input', message: "please enter description.", name: 'description', default: '' },
                ])
            ]);
            resolve({...messageInfoList[0], name});
        }catch (e) {
            resolve({name, author: '', description: '', version: '1.0.0' })
        }
    })
}
module.exports = {
    create: (...args) => {
        return init(...args).catch(err => {})
    },
}
