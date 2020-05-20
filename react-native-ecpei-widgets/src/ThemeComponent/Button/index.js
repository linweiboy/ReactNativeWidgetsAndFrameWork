import React, { Component } from 'react';
import {
    TouchableOpacityThrottle, ConnectTouchable, TouchableType
} from "./TouchableThrottle";
import PropTypes from "prop-types";
import { ImageBackground, TouchableOpacity, Text, StyleSheet } from "react-native"
import { RypTheme } from "../../RypTheme";
import { Button as _Button } from "native-base"

class Button extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <_Button ref={c => this._root = c} {...this.props} >
                {
                    this.props.children
                }
            </_Button>
        )
    }
}
Button.propTypes = {
    ...TouchableOpacityThrottle.propTypes,
    ..._Button.propTypes
};


/**
 *  
 * 
 * NativeBase.Button:{
 *     borderColor:"",
 *      .....
 * }
 * 
 * 圆角  rounded
 * 镂空 边框 bordered
 * 占据整行 block
 * 几种状态 字体颜色
 *  primary
 *  danger
 *  warning
 *  info
 * 大小
 *  large
 *  small
 * 激活
 *  active
 *  disabled  不可点击 背景改变
 * 
 * icon
 *  iconLeft
 *  iconRight
 */

const ThemeButton = ConnectTouchable({ throttle: 500, type: TouchableType.Throttle, isthrottle: true })(RypTheme.registerComponent("NativeBase.Button", Button))

export { ThemeButton as Button }