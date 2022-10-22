/** Queue of components that have been mounted and are awaiting componentDidMount */
export declare const mounts: any[];
/** Diff recursion count, used to track the end of the diff cycle. */
export declare let diffLevel: number;
/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *  @param {Element} [dom=null]    A DOM node to mutate into the shape of the `vnode`
 *  @param {VNode} vnode      A VNode (with descendants forming a tree) representing the desired DOM structure
 *  @param parent
 *  @param component
 *  @param updateSelf
 *  @returns {Element} dom      The created/mutated element
 *  @private
 */
export declare function diff(dom: HTMLElement | null, vnode: any, parent: any, component: any, updateSelf?: any): any;
/** Recursively recycle (or just unmount) a node and its descendants.
 *  @param {Node} node            DOM node to start unmount/removal from
 *  @param {Boolean} [unmountOnly=false]  If `true`, only triggers unmount lifecycle, skips removal
 */
export declare function recollectNodeTree(node: any, unmountOnly: any): void;
/** Recollect/unmount all children.
 *  - we use .lastChild here because it causes less reflow than .firstChild
 *  - it's also cheaper than accessing the .childNodes Live NodeList
 */
export declare function removeChildren(node: any): void;
