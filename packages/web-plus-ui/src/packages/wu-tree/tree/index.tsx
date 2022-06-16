/**
 * 树组件
 */
import $ from '@/common/jquery';
export const defaultOption = {
    label: 'text',
    id: 'id',
    lineHeight: 32,
    dataType: 'tree',
    lazyLoad:false,
    // pId: 'parentid',
    selectType: 'checkbox',//radio,null
    checkDisabled: function (d) {
        return false;
    },
    autoOpen: function (d, level) {
        return level <= 2;
    },
    checkSticky: { //check关联
        on: 'pc',//p,自动勾选父，c自动勾选子，function
        off: 'pc'
    },
    editNode: function (d) {
        return true;
    },
    deleteNode: function (d) {
        return true;
    },
    addChildNode: function (d) {
        return true;
    }
};
export class Tree {
    constructor() {
        console.log($);
        console.log(defaultOption);
    }
}
