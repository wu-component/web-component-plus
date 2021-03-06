import { hyphenateReverse } from './util';

export function getAttrMap(dom: any) {
    const pairs: Record<string, any> = {};
    for (let i = 0, len = dom.attributes.length; i < len; i++) {
        const name = dom.attributes[i].nodeName;
        const value = dom.attributes[i].nodeValue;
        if (dom.attributes[i].specified) {
            pairs[hyphenateReverse(name)] = value;
        }
    }
    return pairs;
}

export function getHost(ele) {
    let p = ele.parentNode;
    while (p) {
        if (p.host) {
            return p.host;
        } else if (p.shadowRoot && p.shadowRoot.host) {
            return p.shadowRoot.host;
        } else {
            p = p.parentNode;
        }
    }
}
