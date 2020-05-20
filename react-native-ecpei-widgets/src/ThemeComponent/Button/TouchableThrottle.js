/*
 * @Author: 爱上无名氏 
 * @Date: 2018-08-24 10:25:13 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-08-07 10:55:23
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import hoistNonReactStatics from "hoist-non-react-statics";
import { } from "./AppTouchable";
import { isStartReactRemoveDebugger } from "react-native-ecpei-common";
import { scaleSize } from "../../utils/Screen";
import MayTouch from "./utils/timeChange";
class ThrottleTask {
    throttle = 0;
    _last = (new Date()).getTime();
    constructor(time = 1000) {
        this.throttle = Math.abs(time)
        this.reStart()
    }
    reStart() {
        this._last = (new Date()).getTime();
    }
    isRuning() {
        if (MayTouch(this._last)) return false;
        return (new Date()).getTime() - this._last < this.throttle
    }
}

export const TouchableType = {
    Throttle: "Throttle",
    Debounce: "Debounce"
}
const minWidth = scaleSize(79);
const minHeight = scaleSize(59);
export function ConnectTouchable(config = {}) {
    return function (WrapComponent) {
        class TouchableThrottle extends Component {
            throttleTask = null;
            isRemobeDebugger = false;
            constructor(props) {
                super(props);
                this.state = {
                    //节流时间
                    throttleTime: this.props.throttleTime || config.throttleTime || 1000,
                    //节流类型
                    type: this.props.type || config.type || TouchableType.Throttle,
                    //是否节流
                    isthrottle: this.props.isThrottle,
                    //是否接受 全局节流
                    startAppThrottle: this.props.startAppThrottle,
                    //是否 可控 范围过小
                    isMinStyle: false
                }
                if (this.state.isthrottle)
                    this.throttleTask = new ThrottleTask(this.state.throttleTime)

                this.isRemobeDebugger = isStartReactRemoveDebugger();
            }
            componentWillReceiveProps(nP, op) {
                this.setState({
                    type: nP.type,
                    isthrottle: nP.isThrottle
                });
            }
            reStartTask() {
                this.throttleTask.reStart()
            }
            onPress = (...args) => {
                if (!this.state.isthrottle) { this.props.onPress && this.props.onPress(...args); return; }
                if (this.throttleTask.isRuning()) {
                    if (this.state.type == TouchableType.Debounce)
                        this.reStartTask()
                    return
                } else {
                    this.reStartTask()
                    this.props.onPress && this.props.onPress(...args)
                }

            }
            componentWillUnmount() {
                this.throttleTask = null;
            }
            _onLayout = (event) => {
                // if (this.isRemobeDebugger && __DEV__) {
                //     let { x, y, width, height } = event.nativeEvent.layout;
                //     if (width <= minWidth || height <= minHeight) {
                //         if (this.state.isMinStyle == false) {
                //             console.warn("发现 点击按钮范围过小组件==>", JSON.stringify({
                //                 ...this.props.children._source,
                //                 height,
                //                 width
                //             }, null, 2));
                //             this.setState({ isMinStyle: true });
                //         }
                //     } else {
                //         this.setState({ isMinStyle: false });
                //     }
                // }
                this.props.onLayout && this.props.onLayout(event)
            }
            _getDevStyle = () => {
                // if (this.isRemobeDebugger && __DEV__) {
                //     return [
                //         {
                //             minWidth: minWidth,
                //             minHeight: minHeight,
                //         },
                //         this.state.isMinStyle ? { borderWidth: 2, borderColor: "red", } : null,
                //         this.props.style
                //     ]
                // }
                return this.props.style;
            }
            render() {
                return (
                    <WrapComponent {...this.props} style={this._getDevStyle()} onPress={this.onPress} isThrottle={this.state.startAppThrottle} onLayout={this._onLayout}>
                        {
                            this.props.children
                        }
                    </WrapComponent>
                )
            }
        }
        TouchableThrottle.defaultProps = {
            throttleTime: 500,
            type: TouchableType.Throttle,
            isThrottle: true
        }
        TouchableThrottle.propTypes = {
            throttleTime: PropTypes.number,
            type: PropTypes.string,
            isThrottle: PropTypes.bool
        }

        TouchableThrottle.WrappedComponent = WrapComponent
        TouchableThrottle.displayName = `Throttle${WrapComponent.displayName}`
        return hoistNonReactStatics(TouchableThrottle, WrapComponent)
    }
}

/**
 * TouchableNativeFeedback
 * TouchableHighlight
 * TouchableOpacity
 * TouchableWithoutFeedback
 * exam:
 *      <TouchableOpacity></TouchableOpacity>
 * 
 *      直接替换为
 *      <TouchableOpacityThrottle> 
 *      或者
 *      <TouchableOpacityThrottle throttleTime= {500} type = {"Debounce"} isThrottle= {true}>
 *      
 *      所有参数都是可选的 默认值见下
 * 
 * 
 * 说明 :
 *     开启远程 chrome 调试 定时器是不准确的
 *
 *  throttleTime:时间间隔
 *  type:Debounce | Throttle
 *  isThrottle:是否开启触发控制
 *  startAppThrottle:是否开启App全局节流
 */
export const TouchableNativeFeedbackThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableNativeFeedback)
export const TouchableHighlightThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableHighlight)
export const TouchableOpacityThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableOpacity)
export const TouchableWithoutFeedbackThrottle = ConnectTouchable({ throttleTime: 500, type: TouchableType.Throttle, isThrottle: true, startAppThrottle: false })(TouchableWithoutFeedback)


