/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * Forward-slash paths can be used in Windows as long as they're not
 * extended-length paths and don't contain any non-ascii characters.
 * This was created since the path methods in Node.js outputs \\ paths on Windows.
 */
export declare const normalizePath: (path: string) => string;
/**
 * Same as normalizePath(), expect it'll also strip any querystrings
 * from the path name. So /dir/file.css?tag=cmp-a becomes /dir/file.css
 */
export declare const normalizeFsPath: (p: string) => string;
export declare const normalizeFsPathQuery: (importPath: string) => {
    filePath: string;
    ext: string;
    params: URLSearchParams;
    format: string;
};
