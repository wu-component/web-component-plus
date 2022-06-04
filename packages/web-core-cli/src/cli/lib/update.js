const https = require('https');
const path = require("path");
const fs = require("fs");
const ora = require('ora');
const log = require('../utils/log');
const configUrl = 'https://gitee.com/canyuegongzi/t-cli-templatt-cli-templatee/raw/t-cli-template-config/t-cli-templatt-cli-templatee.json';
/**
 * 获取模板
 * @param options
 * @param context
 * @returns {Promise<void>}
 */
async function getList(options = {}, context = process.cwd()) {
    return new Promise(resolve => {
        https.get(configUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (error) => {
            log('ERROR', error.message);
        });
    })
}

/**
 * 更新模板
 * @param data
 * @returns {Promise<void>}
 */
async function update(data) {
    const updateSpinner = ora({ text: 'start update config...', color: 'blue'}).start();
    const errorCallback = (err) => {
        updateSpinner.fail('update fail!!!!');
        log('ERROR', err);
    }
    return new Promise(async resolve => {
        const configData = await getList();
        // 修改类型配置文件
        fs.readFile(path.join(__dirname, '../config/', 'category.json'), 'utf8',(err, fileData) => {
           if (err) {
               errorCallback(err);
               resolve(false);
           }
           fs.writeFile(path.join(__dirname, '../config/', 'category.json'), JSON.stringify({categoryList: configData.categoryList}, null, 4), 'utf8', (err) => {
               if (err) {
                   errorCallback(err);
                   resolve(false);
               }
               fs.readFile(path.join(__dirname, '../config/', 'template.json'), 'utf8',(err, fileData) => {
                   if (err) {
                       errorCallback(err);
                       resolve(false);
                   }
                   fs.writeFile(path.join(__dirname, '../config/', 'template.json'), JSON.stringify({templateList: configData.templateList}, null, 4), 'utf8', (err) => {
                       if (err) {
                           errorCallback(err);
                           resolve(false);
                       }
                       updateSpinner.succeed('update success!!!');
                       resolve(true);
                   });
               })
           });
        })
    })

}
module.exports = (...args) => {
    return update(...args).catch(err => {})
}
