import { h, Component } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-message',
    css: css,
})
export class WuMessage extends HTMLElement {
    constructor() {
        super();
    }

    public render(_renderProps = {}, _store = {}) {
        return <div>是顶顶顶</div>;
    }
}

/**
 * 消息提示管理器
 */
export class PopupManager {
    // example https://blog.csdn.net/asd0356/article/details/117672669
}
