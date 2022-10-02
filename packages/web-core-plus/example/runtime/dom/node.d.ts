/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {Element} The created DOM node
 */
export declare function createNode(nodeName: string, isSvg: boolean): any;
/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
export declare function removeNode(node: HTMLElement): void;
/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node      DOM Node to compare
 * @param {VNode} vnode      Virtual DOM node to compare
 * @param {boolean} [hydrating=false]  If true, ignores component constructors when comparing.
 * @private
 */
export declare function isSameNodeType(node: any, vnode: any, hydrating: boolean): boolean;
/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node  A DOM Element to inspect the name of.
 * @param {String} nodeName  Unnormalized name to compare against.
 */
export declare function isNamedNode(node: any, nodeName: string): boolean;
