import { h, Component, WuComponent, Prop, State, Watch, Emit, Provide } from '@wu-component/web-core-plus';
import css from './index.scss';
import "@wu-component/wu-collapse-item/src/index";

@Component({
    name: 'wu-plus-collapse',
    css: css,
})
export class WuCollapse extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: false, type: Boolean })
    public accordion: boolean;

    @Prop({ default: [], type: Array })
    public value: string[];

    @State({ default: [], type: Array })
    public activeNames: string[];

    @Watch('value')
    public valueChange(value: string[], old: string[]) {
        this.activeNames = [].concat(value);
    }

    @Emit('input')
    public inputChange(val: any) {
        return { value: val };
    }

    @Emit('change')
    public change(val: any) {
        return { value: val };
    }

    @Provide('wuCollapseRef')
    public wuCollapseRef() {
        return this;
    }

    /**
     * 设置激活的item
     * @param activeNames
     */
    public setActiveNames(activeNames: string[]) {
        activeNames = [].concat(activeNames);
        const value = this.accordion ? [ activeNames[0] ] : activeNames;
        this.activeNames = activeNames;
        this.inputChange(value);
        this.change(value);
    }

    public handleItemClick(item) {
        if (this.accordion) {
            this.setActiveNames(
                (this.activeNames[0] || (this.activeNames[0] + '') === '0') &&
                this.activeNames[0] === item.name
                    ? '' : item.name
            );
        } else {
            const activeNames = this.activeNames.slice(0);
            const index = activeNames.indexOf(item.name);

            if (index > -1) {
                activeNames.splice(index, 1);
            } else {
                activeNames.push(item.name);
            }
            this.setActiveNames(activeNames);
        }
        Promise.resolve().then(() => {
            item.update?.();
        });
    }


    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-collapse" role="tablist" aria-multiselectable="true">
                <slot />
            </div>
        );
    }
}
