import { h, Component, Prop, Emit, OnConnected, OnBeforeRender, Watch, OnUpdated, OnBeforeUpdate, Provide, WuComponent }
    from '@wu-component/web-core-plus';
import "@wu-component/wu-checkbox";
import css from './index.scss';
type UISize = 'medium' | 'small' | 'mini';

@Component({
    name: 'wu-plus-checkbox-group',
    css: css,
})
export class WuCheckboxGroup extends WuComponent implements OnConnected, OnUpdated, OnBeforeRender, OnBeforeUpdate {
    constructor() {
        super();
    }

    public slotRef!: HTMLSlotElement;

    @Provide('groupRef')
    public groupRef() {
        return this;
    }

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: [], type: Array })
    public value: string[] = [];

    public valueList: string[] = [];

    public override beforeRender() {}

    @Emit('change')
    public change() {
        return {
            value: this.value,
        };
    }

    @Watch('value')
    public valuesChange(val, old) {
        // this.update();
    }

    /**
     * 值修改
     * @param vale
     */
    public handleChange(vale: CustomEvent) {
        let valueList = [ ...(this.value || []) ];
        const index = valueList.findIndex(item => item === vale.detail.label);
        if (index >= 0) {
            valueList.splice(index, 1);
        } else {
            valueList.push(vale.detail.label);
            valueList = Array.from(new Set(valueList || []));
        }
        this.value = valueList;
        this.change();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.valueList = this.value;
    }

    public override updated() {
        this.updateChild();
    }

    public updateChild(): any {
        this.slotRef = this.shadowRoot.getElementById('slot') as HTMLSlotElement;
        const nodeList = this.slotRef.assignedElements();
        nodeList.forEach(item => {
            (item as any).update();
        });
    }

    public override render(_renderProps = {}, _store = {}) {
        const props = {
            size: this.size,
            disabled: this.disabled,
            value: this.value,
        };
        return (
            <div class="wu-checkbox-group" role="group" aria-label="checkbox-group">
                {/*@ts-ignore*/}
                <slot id="slot" {...props} />
            </div>
        );
    }
}
