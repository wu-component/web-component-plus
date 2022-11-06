// import * as Monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

import { MONACO_CONTENT } from "./content";

export type IMonaco = typeof import("monaco-editor")

export const monaco = (content) => MONACO_CONTENT.get(content) || window.monaco as IMonaco;
