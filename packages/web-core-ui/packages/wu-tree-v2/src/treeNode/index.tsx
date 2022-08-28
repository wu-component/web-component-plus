import { Component, Emit, h, OnConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { Node } from '../model/Node';

@Component({
    name: 'wu-plus-tree-node-v2',
    css: css,
})
export class WuTreeNode extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ type: Object, default: {} })
    public node: Node;

    @Prop({ type: Object, default: {} })
    public prop: Record<string, string>

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
