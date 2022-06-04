import { define } from "./define";

type ComponentEnums = 'CustomWebComponent' | 'LightDom';
export interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    options?: ElementDefinitionOptions;
}

export function Component(options: CustomTagOptions) {
    return function (target) {
        define(options, target);
    };
}
