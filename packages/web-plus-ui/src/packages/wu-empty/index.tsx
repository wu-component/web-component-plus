import { h, Component, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import "./ImgEmpty";

@Component({
    name: 'wu-plus-empty',
    css: css,
})
export class WuEmpty extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '', type: String })
    public image: string;

    @Prop({ default: '', type: String })
    public description: string;

    @Prop({ default: 100, type: Number })
    public size: number;

    get emptyDescription() {
        return this.description || "";
    }

    get imageStyle() {
        return {
            width: this.size ? `${this.size}px` : ''
        };
    }

    public override render(_renderProps = {}, _store = {}) {
       return (
           <div class="wu-empty">
               <div class="wu-empty_image" style={this.imageStyle}>
                   {
                       this.image ? (<img src={this.image} ondragstart="return false"  alt=""/>) : (<wu-plus-img-empty />)
                   }
               </div>
               <div class="wu-empty_description">
                   {
                       this.emptyDescription ? (<p>{this.emptyDescription}</p>) : (<slot name="description" />)
                   }
               </div>
               <div class="wu-empty_bottom">
                   <slot />
               </div>
           </div>
       );
    }
}
