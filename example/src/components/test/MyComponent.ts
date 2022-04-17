import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
    @Prop() color: string = 'blue';

    render() {
        return 111
    }
}
