const templateList = require('../src/cli/config/template.json').templateList;
const { create } = require('../src/cli/lib/init');
const read = require('fs-readdir-recursive')
const path = require('path');
const fs = require('fs');
const rm = require('rimraf').sync
const webTemplateList = templateList.filter(item => item.type === 'web');
const serverTemplateList = templateList.filter(item => item.type === 'server');

describe('init cmd test', function () {
    beforeEach(() => {
        process.env.NODE_ENV = 'test';
    })
    afterAll(() => {
        rm('test/temp');
    });
    test('create web project test', async () => {
        const testLength = webTemplateList.length;
        expect.assertions(testLength);
        for (let i = 0; i < webTemplateList.length; i ++ ) {
            await create(webTemplateList[i].name, {template: webTemplateList[i].name, category: webTemplateList[i].type}, path.join(process.cwd(), 'test/temp'));
            const files = await read('test/temp/' + webTemplateList[i].name);
            const json = fs.readFileSync(path.join('test/temp/', webTemplateList[i].name, 'package.json'),'utf-8')
            const successDownload = JSON.parse(json).name === webTemplateList[i].name;
            const hasPackageName = files.includes('package.json')
            expect(successDownload && hasPackageName).toBe(true);
        }
    }, 10000)

    test('create server project test', async () => {
        const testLength = serverTemplateList.length;
        expect.assertions(testLength);
        for (let i = 0; i < serverTemplateList.length; i ++ ) {
            await create(serverTemplateList[i].name, {template: serverTemplateList[i].name, category: serverTemplateList[i].type}, path.join(process.cwd(), 'test/temp'));
            const files = await read('test/temp/' + serverTemplateList[i].name);
            const json = fs.readFileSync(path.join('test/temp/', serverTemplateList[i].name, 'package.json'),'utf-8')
            const successDownload = JSON.parse(json).name === serverTemplateList[i].name;
            const hasPackageName = files.includes('package.json')
            expect(successDownload && hasPackageName).toBe(true);
        }
    }, 10000)
})
