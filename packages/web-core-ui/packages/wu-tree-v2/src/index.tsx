import { Component, Emit, h, OnConnected, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import './treeNode';

@Component({
    name: 'wu-plus-tree-v2',
    css: css,
})
export class WuTree extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {

    }

    @Emit('node-click')
    public nodeClick(params: any) {
        return params;
    }

    @Emit('check-change')
    public checkChange(params) {
        return params;
    }

    @Emit('move-change')
    public moveChange(params) {
        return params;
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div>
                树组件
            </div>
        );
    }
}
