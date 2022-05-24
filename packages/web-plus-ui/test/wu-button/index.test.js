import { html, fixture, expect } from '@open-wc/testing';

describe("test npm packages", () => {
    it('can check for an exiting css class', async () => {
        const el = await fixture(`<div class="foo bar"></div>`);
        expect(el).to.have.class('foo');
    });

    it('works', async () => {
        const el = await fixture(html` <my-element></my-element> `);
        await expect(el).to.be.accessible();
    });
    it('can semantically compare full dom trees', async () => {
        const el = await fixture(`<div><!-- comment --><h1>${'Hey'}  </h1>  </div>`);
        expect(el).dom.to.equal('<div><h1>Hey</h1></div>');
    });

    it('can semantically compare lightDom trees', async () => {
        const el = await fixture(`<div><!-- comment --><h1>${'Hey'}  </h1>  </div>`);
        expect(el).lightDom.to.equal('<h1>Hey</h1>');
    });

    it('can compare against a snapshot', async () => {
        const el = await fixture(`<div><!-- comment --><h1>${'Hey'}  </h1>  </div>`);
        expect(el).dom.to.equalSnapshot();
    });
});
