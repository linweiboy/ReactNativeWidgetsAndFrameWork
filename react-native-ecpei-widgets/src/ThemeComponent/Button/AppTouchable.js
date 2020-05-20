import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MayTouch from "./utils/timeChange";
/***
 * 控制App所有可点击事件
 * 任何可点击元素  间隔必须是 intervalTime
 */

/**
 * 记录上一次点击事件
 */
let LastTouchTime = 0;
let intervalTime = 500;
function AppHandleAppToubleTime(TouchComponent) {
    const old_Touchable_ComponentDidMount = TouchComponent.prototype.componentDidMount;
    TouchComponent.prototype.componentDidMount = function (...args) {
        if (this.props.onPress) {
            let Touchable_touchableHandlePress = this.touchableHandlePress;
            /**
             * 替换系统默认点击事件
             * @param {*} _args 
             */
            this.touchableHandlePress = function (..._args) {
                if (!!this.props.isThrottle) {
                    let _intervalTime = (this.props.throttleTime && this.props.throttleTime != 0) ? this.props.throttleTime : intervalTime;
                    let now = (new Date()).getTime();
                    if (MayTouch(LastTouchTime) || (now - LastTouchTime) > _intervalTime) {
                        Touchable_touchableHandlePress(..._args);
                        LastTouchTime = now;
                    }
                } else {
                    Touchable_touchableHandlePress(..._args);
                    LastTouchTime = (new Date()).getTime();
                }

            }
        }
        old_Touchable_ComponentDidMount.bind(this)(...args);
    }
}

AppHandleAppToubleTime(TouchableHighlight);
AppHandleAppToubleTime(TouchableOpacity);
AppHandleAppToubleTime(TouchableWithoutFeedback);
AppHandleAppToubleTime(TouchableNativeFeedback);