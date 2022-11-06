import { html, fixture, expect } from '@open-wc/testing';

describe("test npm packages", () => {
    it('can check for an exiting css class', async () => {
        const el = await fixture(`<div class="foo bar"></div>`);
        expect(el).to.have.class('foo');
    });
});
