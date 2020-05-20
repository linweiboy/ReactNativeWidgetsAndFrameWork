
import { Component } from "react";
import RootSiblings from 'react-native-root-siblings';
import BaseComponent from "./BaseComponent";

export default class SpeedyComponent extends BaseComponent {
    elements = [];

    constructor(props) {
        super(props);
    }


    /**
     * 显示提示
     * @param {基础设置} options 
     */
    show(options) {
        let _this = this;
        let _options = { isShow: true };
        _options = Object.assign(_options, options);
        let sibling = new RootSiblings(<_this {..._options} />);
        _this.elements.push(sibling);
        sibling.hide = () => {
            _this.hide(sibling);
        }
        return sibling;
    }


}

