import { CustomTagOptions } from "./Component";

export function define(options: CustomTagOptions, ctor: any) {
    if (customElements.get(options.name)) {
        return;
    }
    ctor.$options = options;
    customElements.define(options.name, ctor, options.options || {});
}
