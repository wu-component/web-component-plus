#!/usr/bin/env node
const program = require('commander')

const options = {
    cmd: '',
    projectName: '',
    mirror: 'default',
    language: 'en'
}
program
    .version(`@wu-component/wu-cli ${require('../../../package').version}`)
    .usage('<command> [options]')

program
    .command('init <app-name>')
    .description('初始化一个工程')
    .option('-c, --category <category>', '工程类型,[web | server]')
    .option('-t, --template <template>', '模板名称')
    .action((name, options) => {
        require('../lib/init').create(name, options).then(r => {})
    })

program
    .command('init-web-component <ComponentName>')
    .description('Initialize a new web component in the current folder')
    .action(function (projectName, option) {
        const cmd = 'init-web-component';
        console.log(option);
        if (option.parent && option.parent.mirror && typeof option.parent.mirror === 'string') {
            options.mirror = option.parent.mirror;
        }
        switchCommand(cmd, { project: projectName, mirror: options.mirror, language: options.language });
    })

program
    .command('list')
    .description('列出项目模板')
    .option('-c, --category <category>', '工程类型,[web | server]')
    .option('-q, --query <query>', '查询字符串')
    .action((options) => {
        require('../lib/list')(options)
    })

program
    .command('update')
    .description('更新配置')
    .option('-t, --type <type>', '更新类型,[config]')
    .action((options) => {
        require('../lib/update')(options)
    })

program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
})

program.parse(process.argv);

function switchCommand(cmd, args) {
    if (cmd) {
        require('../lib/' + cmd)(args);
    } else {
        setTimeout(program.help, 0);
    }
}

function isCnFuc(language) {
    return language === "cn"
}

function selectLanguage(language) {
    if (language !== 'en' && language !== 'cn') {
        language = 'en';
    }
    options.language = language;
    return language;
}

function isInitTemplate(cmd) {
    return /init-(.)+/.test(cmd) && /init-([^\ ]+)/.exec(cmd)[1];
}
