// import * as Monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

export type IMonaco = typeof import("monaco-editor")

export const monaco = window.monaco as IMonaco;
