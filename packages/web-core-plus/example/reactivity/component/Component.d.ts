declare type ComponentEnums = 'CustomWebComponent' | 'LightDom';
export interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    isMountDom?: boolean;
    options?: ElementDefinitionOptions;
}
export declare function Component(options: CustomTagOptions): (target: any) => void;
export {};
