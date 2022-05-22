const update = require('../src/cli/lib/update');
describe('update cmd test', function () {
    beforeEach(() => {
        process.env.NODE_ENV = 'test';
    })
    test('update config test', async () => {
        expect.assertions(1);
        await update();
        const templateList = require('../src/cli/config/template.json').templateList
        expect(templateList.length > 0).toBe(true);
    }, 10000)
})
