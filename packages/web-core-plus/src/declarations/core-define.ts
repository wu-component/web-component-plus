export interface ListenerMetadata {
    eventName: string;
    handler: Function;
    selector?: string;
}

export interface CustomEventOptions {
    bubbles?: boolean;
    composed?: boolean;
    detail?: any;
}

export interface DispatchEmitter {
    emit(options?: CustomEventOptions): void;
}
export interface KeyValue {
    [key: string]: any;
}
