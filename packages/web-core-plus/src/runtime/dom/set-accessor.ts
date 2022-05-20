import { IS_NON_DIMENSIONAL } from '../../app-data';
import { applyRef } from '../../utils';
import { extension } from '../../utils/extend';
import { bindEvent } from './event';

/**
 * Set a named attribute on the given Node, with special behavior for some names
 * and event handlers. If `value` is `null`, the attribute/handler will be
 * removed.
 * @param {Element} node An element to mutate
 * @param {string} name The name/key to set, such as an event or attribute name
 * @param {*} old The last value that was set for this name/node pair
 * @param {*} value An attribute value, such as a function to be used as an
 *  event handler
 * @param {boolean} isSvg Are we currently diffing inside an svg?
 * @param component
 * @private
 */
export function setAccessor(node: any, name: string, old: HTMLElement, value: any, isSvg: boolean, component: any) {
    if (name === 'className') name = 'class';

    if (name[0] == 'o' && name[1] == '-') {
        if (extension[name]) {
            extension[name](node, value, component);
        }
    } else if (name === 'key') {
        // ignore
    } else if (name === 'ref') {
        applyRef(old, null);
        applyRef(value, node);
    } else if (name === 'class' && !isSvg) {
        node.className = value || '';
    } else if (name === 'style') {
        if (!value || typeof value === 'string' || typeof old === 'string') {
            node.style.cssText = value || '';
        }
        if (value && typeof value === 'object') {
            if (typeof old !== 'string') {
                for (const i in old) if (!(i in value)) node.style[i] = '';
            }
            for (const i in value) {
                node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
            }
        }
    } else if (name === 'dangerouslySetInnerHTML') {
        if (value) node.innerHTML = value.__html || '';
    } else if (name[0] == 'o' && name[1] == 'n') {
        bindEvent(node, name, value, old);
    } else if (node.nodeName === 'INPUT' && name === 'value') {
        node[name] = value == null ? '' : value;
    } else if (name !== 'list' && name !== 'type' && name !== 'css' && !isSvg && name in node && value !== '') {
        //value !== '' fix for selected, disabled, checked with pure element
        // Attempt to set a DOM property to the given value.
        // IE & FF throw for certain property-value combinations.
        try {
            node[name] = value == null ? '' : value;
        } catch (e) {}
        if ((value == null || value === false) && name != 'spellcheck') node.pureRemoveAttribute ? node.pureRemoveAttribute(name) : node.removeAttribute(name);
    } else {
        const ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
        // spellcheck is treated differently than all other boolean values and
        // should not be removed when the value is `false`. See:
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-spellcheck
        if (value == null || value === false) {
            if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
            else node.pureRemoveAttribute ? node.pureRemoveAttribute(name) : node.removeAttribute(name);
        } else if (typeof value !== 'function') {
            if (ns) {
                node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
            } else {
                node.pureSetAttribute ? node.pureSetAttribute(name, value) : node.setAttribute(name, value);
            }
        }
    }
}
