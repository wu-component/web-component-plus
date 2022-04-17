import { webOptions as options } from '../../app-data';

/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {Element} The created DOM node
 */
export function createNode(nodeName: string, isSvg: boolean) {
    /** @type {Element} */
    const node: any = isSvg
        ? document.createElementNS('http://www.w3.org/2000/svg', nodeName)
        : document.createElement(nodeName);
    node.normalizedNodeName = nodeName;
    return node;
}

/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
export function removeNode(node: HTMLElement) {
    const parentNode = node.parentNode;
    if (parentNode) parentNode.removeChild(node);
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node      DOM Node to compare
 * @param {VNode} vnode      Virtual DOM node to compare
 * @param {boolean} [hydrating=false]  If true, ignores component constructors when comparing.
 * @private
 */
export function isSameNodeType(node: any, vnode: any, hydrating: boolean) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return node.splitText !== undefined;
    }
    if (typeof vnode.nodeName === 'string') {
        return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
    } else if (typeof vnode.nodeName === 'function') {
        return (options as any).mapping[node.nodeName.toLowerCase()] === vnode.nodeName;
    }
    return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node  A DOM Element to inspect the name of.
 * @param {String} nodeName  Unnormalized name to compare against.
 */
export function isNamedNode(node: any, nodeName: string) {
    return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}
