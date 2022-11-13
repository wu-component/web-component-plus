import { h, Component, WuComponent, OnConnected, State } from '@wu-component/web-core-plus';
import './index.tsx';

@Component({
    name: 'app-view1',
    css: ``
})
export class App1 extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public treeRef

    public treeRef1

    public override connected() {
        // this.treeRef1.setAttribute("data", this.data);
        // this.updateData();
    }

    public updateData() {
        this.data = [ { "label":"一级11aaaa 1","value":"1","children":[ { "label":"二级 1-1","value":"1.1","children":[ { "label":"三级 1-1-1","value":"1.1.1" } ] } ] },{ "label":"一级 2","value":"2","children":[ { "label":"二级 2-1","value":"2.1","children":[ { "label":"三级 2-1-1","value":"2.1.1" } ] },{ "label":"二级 2-2","value":"2.2","children":[ { "label":"三级 2-2-1","value":"2.2.1" } ] } ] },{ "label":"一级 3","value":"3","children":[ { "label":"二级 3-1","value":"3.1","children":[ { "label":"三级 3-1-1","value":"3.1.1" } ] },{ "label":"二级 3-2","value":"3.2","children":[ { "label":"三级 3-2-1","value":"3.2.1" } ] } ] } ];
    }

    @State()
    public data = [ { "label":"一级 1","value":"1","children":[ { "label":"二级 1-1","value":"1.1","children":[ { "label":"三级 1-1-1","value":"1.1.1" } ] } ] },{ "label":"一级 2","value":"2","children":[ { "label":"二级 2-1","value":"2.1","children":[ { "label":"三级 2-1-1","value":"2.1.1" } ] },{ "label":"二级 2-2","value":"2.2","children":[ { "label":"三级 2-2-1","value":"2.2.1" } ] } ] },{ "label":"一级 3","value":"3","children":[ { "label":"二级 3-1","value":"3.1","children":[ { "label":"三级 3-1-1","value":"3.1.1" } ] },{ "label":"二级 3-2","value":"3.2","children":[ { "label":"三级 3-2-1","value":"3.2.1" } ] } ] } ]

    public showCheckbox = true;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="app-container">
                <wu-plus-tree-v2  ref={(ref) => this.treeRef = ref} draggable="false" default-expanded-keys="['1', '1.1']" show-checkbox="true" node-key="value" id="tree1" default-checked-keys="['1']" data='[{"label":"一级 1","value":"1","children":[{"label":"二级 1-1","value":"1.1","children":[{"label":"三级 1-1-1","value":"1.1.1"}]}]},{"label":"一级 2","value":"2","children":[{"label":"二级 2-1","value":"2.1","children":[{"label":"三级 2-1-1","value":"2.1.1"}]},{"label":"二级 2-2","value":"2.2","children":[{"label":"三级 2-2-1","value":"2.2.1"}]}]},{"label":"一级 3","value":"3","children":[{"label":"二级 3-1","value":"3.1","children":[{"label":"三级 3-1-1","value":"3.1.1"}]},{"label":"二级 3-2","value":"3.2","children":[{"label":"三级 3-2-1","value":"3.2.1"}]}]}]'></wu-plus-tree-v2>
                <wu-plus-tree-v2 ref={(ref) => this.treeRef1 = ref} draggable="false" data={JSON.stringify(this.data)} show-checkbox={this.showCheckbox}></wu-plus-tree-v2>
                <button onclick={() => this.updateData()}>按钮</button>
            </div>
        );
    }
}
