import { CustomTagOptions } from "./Component";

export function define(options: CustomTagOptions, ctor: any) {
    // 默认挂载dom
    if (options.isMountDom === undefined) {
        options.isMountDom = true;
    }
    if (customElements.get(options.name)) {
        return;
    }
    ctor.$options = options;
    customElements.define(options.name, ctor, options.options || {});
}
