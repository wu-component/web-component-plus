import { webOptions as options } from "../../app-data";

/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */
export function eventProxy(e: any) {
    // @ts-ignore
    return this._listeners[e.type]((options.event && options.event(e)) || e);
}

export function bindEvent(node: any, name: any, value: any, old: any) {
    const useCapture = name !== (name = name.replace(/Capture$/, ''));
    const nameLower = name.toLowerCase();
    name = (nameLower in node ? nameLower : name).slice(2);
    if (value) {
        if (!old) {
            node.addEventListener(name, eventProxy, useCapture);
        }
    } else {
        node.removeEventListener(name, eventProxy, useCapture);
    }
    ;(node._listeners || (node._listeners = {}))[name] = value;
}
