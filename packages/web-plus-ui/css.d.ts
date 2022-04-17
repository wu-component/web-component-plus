declare module '*.css' {
    const css: string;
    export default css;
}
declare module '*.scss' {
    const css: string;
    export default css;
}
declare module '*.ttf' {
    const ttf: string;
    export default ttf;
}
declare module '*.woff' {
    const woff: string;
    export default woff;
}
declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.txt' {
    const src: string;
    export default src;
}

declare module '*.frag' {
    const src: string;
    export default src;
}

declare module '*.vert' {
    const src: string;
    export default src;
}

declare module '*?worker' {
    export const worker: Worker;
    export const workerMsgId: string;
    export const workerName: string;
    export const workerPath: string;
}

declare module '*?format=url' {
    const src: string;
    export default src;
}

declare module '*?format=text' {
    const content: string;
    export default content;
}
