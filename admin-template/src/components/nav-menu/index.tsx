import { h, Component, WuComponent, OnConnected } from '@wu-component/web-core-plus';
import router from "@/router";
import style from "./index.css";

@Component({
    name: 'app-nav-menu',
    css: style
})
export class AppNavMenu extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected() {
        //router.push('/home')
    }

    private menuSelect(item) {
        router.push(item.detail.index)
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <wu-plus-menu css="box-sizing: border-box;" class="navMenu" onSelect={(item) => this.menuSelect(item)} background-color="#545c64" text-color="#fff" default-active="/home" default-openeds="[]" active-text-color="#ffd04b" id="menuId1">
                {/*基础组件*/}
                <wu-plus-sub-menu index="14" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="folder"></wu-plus-icon>
                        <span style="padding-left: 8px">基础组件</span>
                    </div>
                    <wu-plus-menu-item index="/button">
                        <span style="padding-left: 8px">基础按钮</span>
                    </wu-plus-menu-item>
                    <wu-plus-menu-item index="/icon">
                        <span style="padding-left: 8px">基础图标</span>
                    </wu-plus-menu-item>
                </wu-plus-sub-menu>
                {/*高级组件*/}
                <wu-plus-sub-menu index="14" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="s-promotion"></wu-plus-icon>
                        <span style="padding-left: 8px">高级组件</span>
                    </div>
                    <wu-plus-menu-item index="/codeEditorView">
                        <span style="padding-left: 8px">代码编辑</span>
                    </wu-plus-menu-item>
                    <wu-plus-menu-item index="/lottieView">
                        <span style="padding-left: 8px">Lottie动画</span>
                    </wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="/home">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">处理中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-sub-menu index="2" disabled="false">
                    <div slot="title" style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span style="padding-left: 8px">导航组</span>
                    </div>
                    <wu-plus-menu-item index="/about">系统配置</wu-plus-menu-item>
                    <wu-plus-menu-item index="/my">用户中心</wu-plus-menu-item>
                </wu-plus-sub-menu>
                <wu-plus-menu-item index="/message">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">用戶中心</span>
                    </div>
                </wu-plus-menu-item>
                <wu-plus-menu-item index="13" disabled="true">
                    <div style="display: flex;align-items: center">
                        <wu-plus-icon style="font-size: 24px;" name="setting"></wu-plus-icon>
                        <span slot="title" style="padding-left: 8px">系統設置</span>
                    </div>
                </wu-plus-menu-item>
            </wu-plus-menu>
        );
    }
}
