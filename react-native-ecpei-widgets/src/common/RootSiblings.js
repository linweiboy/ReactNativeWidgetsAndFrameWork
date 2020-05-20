
import React from 'react';
import RootSibling from 'react-native-root-siblings';

export default class RootSiblings {
    elements = [];
    show(ELE) {
        if (!React.isValidElement(ELE)) return null;
        let _this = this;
        let sibling = new RootSibling(ELE);
        this.elements.push(sibling);
        sibling.close = () => {
            _this.close && _this.close(sibling);
        }
        return sibling;
    }

    /**
     * 关闭提示
     * @param {需要关闭的元素，可选} ele 
     */
    close(siblingEle) {
        if (siblingEle) {
            siblingEle.destroy && siblingEle.destroy();
        } else {
            this.destroyLastSibling();
        }
    }


    /**
     * 释放最后一个组件
     */
    destroyLastSibling = () => {
        if (this.elements.length <= 0) return;
        let lastSibling = this.elements.pop();
        lastSibling && lastSibling.destroy();
    };
    clear(){
        this.elements.map((sibL)=>{
            sibL.close && sibL.close()
            sibL.destroy && sibL.destroy()
        })
        this.elements = [];
    }
}