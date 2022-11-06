const fs = require("fs");
const path = require('path');
const convert = require('xml-js');
const efs = require('fs-extra');

const { resolve } = path;
const { readFile, writeFile, readSync, writeSync } = fs;
const { ensureFileSync } = efs;
function hyphenateReverse(str) {
    if (str.indexOf('-') > -1) {
        return str.replace(/(\-([a-zA-Z0-9]))/g, (match, p1, p2, offset, string) => {
            // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
            return p2.toUpperCase();
        });
    }
    return str;
}
// 处理 SVG 的形变
// fixme 各个项目所需形变参数可能不一样，故此参数需要针对项目进行调整
const svgTransform = 'transform="translate(0 900)scale(1 -1)"';

// svg 文件模板
const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1584762969678" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="12392" width="200" height="200"><defs><style type="text/css"/></defs><path d="__PATH__" /></svg>`;

readFile(resolve(__dirname, './fonteditor/iconfont.svg'), 'utf8', (err, res) => {
    const file = convert.xml2json(res, { compact: true, spaces: 4 });
    const json = JSON.parse(file);
    const glyphList = json.svg.defs.font.glyph;
    const comListMap = {};
    glyphList.forEach(item => {
        const name = item._attributes['glyph-name'];
        const d = item._attributes['d'];
        const unicode = item._attributes['unicode'];
        const filePath = `./packages/${name}/Icon.ts`;
        const filePath1 = `./packages/${name}/index.ts`;
        ensureFileSync(resolve(__dirname, filePath));
        ensureFileSync(resolve(__dirname, filePath1));
        const fd1 = fs.openSync(resolve(__dirname, filePath) , "w");

        const content1 = `// ${name}
export const Icon = '<path d="${d}"></path>';
`;
        fs.writeSync(fd1, content1);
        fs.closeSync(fd1);


        let strClassName = hyphenateReverse(name);
        const characters = [ ...strClassName ];
        characters[0] = characters[0].toUpperCase();
        strClassName = characters.join("");
        comListMap[name] = strClassName;
        let classContent = `import { Icon } from './Icon';
import style from '../style.css';
import { getFontSize } from '@/share';
export default class WuIcon${strClassName} extends HTMLElement {
    icon: any
    static get observedAttributes() {
        return [ 'size', 'color' ];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = \`
            <style>
                [[style]]
            </style>
            <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 1024 1024">
                [[Icon]]
            </svg>
        \`;
        this.icon = this.shadowRoot?.getElementById('icon')  as HTMLElement;
    }

    connectedCallback() {
        this.upgradeProperty();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'color') {
            this.icon.style.color = newValue;
        } else if (name === 'size') {
            const fontSize = this.getFontSize();
            this.icon.style.fontSize = \`[[fontSize]]\`;
        }
    }

    upgradeProperty() {
        this.size = this.size;
        this.color = this.color;
    }

    getFontSize() {
        return getFontSize(this.size);
    }

    get size() {
        return this.getAttribute('size') as string;
    }

    get color() {
        return this.getAttribute('color') as string;
    }

    set size(value: string) {
        this.setAttribute('size', value);
    }

    set color(value: string) {
        this.setAttribute('color', value);
    }
}

if (!customElements.get('wu-icon-${name}')) {
    customElements.define('wu-icon-${name}',  WuIcon${strClassName});
}
        `;
        classContent = classContent.replace('[[style]]', '${style}');
        classContent = classContent.replace('[[Icon]]', '${Icon}');
        classContent = classContent.replace('[[fontSize]]', '${fontSize}');
        // const fileContent = fs.readFileSync(resolve(__dirname, filePath));
        // console.log(fileContent);
        const fd = fs.openSync(resolve(__dirname, filePath1) , "w");

        const content = classContent;
        fs.writeSync(fd, content);
        fs.closeSync(fd);
        //4.关闭文件 fs.closeSync(fd);
    });
    let str = '';
    const com = [];
    for (let key in comListMap) {
        str += `import ${comListMap[key]} from './${key}';\n`;
        com.push(comListMap[key]);
    }
    const filePath = `./packages/index.ts`;
    str += `export default {${com.join(', ')}}`;
    const fd = fs.openSync(resolve(__dirname, filePath) , "w");

    const content = str;
    fs.writeSync(fd, content);
    fs.closeSync(fd);
});
