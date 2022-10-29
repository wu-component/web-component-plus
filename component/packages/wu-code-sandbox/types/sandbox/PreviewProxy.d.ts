export interface LoadDependencies {
    dependencies: Record<string, string>;
    types?: Record<string, string>;
    name?: string;
}
export declare class PreviewProxy {
    iframe: HTMLIFrameElement;
    handlers: Record<string, Function>;
    pending_cmds: Map<number, {
        resolve: (value: unknown) => void;
        reject: (reason?: any) => void;
    }>;
    handle_event: (e: any) => void;
    constructor(iframe: HTMLIFrameElement, handlers: Record<string, Function>);
    destroy(): void;
    iframe_command(action: string, args: any): Promise<unknown>;
    handle_command_message(cmd_data: any): void;
    handle_repl_message(event: any): any;
    eval(script: string | string[]): Promise<unknown>;
    handle_links(): Promise<unknown>;
    load_depend(options: LoadDependencies): Promise<unknown>;
}
