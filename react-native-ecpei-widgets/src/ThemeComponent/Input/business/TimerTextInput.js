import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput as _TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { RypTheme } from "../../../RypTheme";
import computeProps from "../../../utils/computeProps";
import { View, Text } from "native-base";
import { InputProperty } from '../BaseInput';
import { TextInput } from "../TextInput";
import BackgroundTimer from 'react-native-background-timer';

export class TimerTextInput extends InputProperty {
    Runing = false
    constructor(props) {
        super(props);
        this.state = {
            timer: this.props.timer
        }
    }
    getValue() { return this.input.getValue() }
    getTextInputInstance() { return this.input.getTextInputInstance() }
    setValue(value) { this.input.setValue(value) }

    /**
     * 
     * @param {*} ing 是否获取焦点
     * @param {*} value 
     */
    _getShowText(ing, value) {
        if (this.props.showTitleHandle && typeof this.props.showTitleHandle == "function") {
            return this.props.showTitleHandle(this.state.timer, ing, value)
        } else {
            return `${this.state.timer}`
        }
    }
    /**
     * 主动触发倒计时
     */
    start = () => {
        if (this.Runing == false) {
            this.Runing = true;
            this.props.onStart && this.props.onStart()

            this._timer =  BackgroundTimer.setInterval(() => {
                let timer = this.state.timer - 1;
                this.setState({ timer });
                if (timer <= 0) {
                    this.setState({
                        timer: this.props.timer
                    }, () => {
                        BackgroundTimer.clearInterval(this._timer);
                        this.Runing = false;
                        this.props.onEnd && this.props.onEnd()
                    });
                }
            }, 1000)
        }
    }
    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
    }
    render() {
        return (
            <TextInput {...this.props} ref={r => this.input = r}
                rightAssistComponent={(ing, value) => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacityThrottle activeOpacity={1} style={[
                                this.Runing ? this.props.timerIngContainerStyle : this.props.timerNorContainerStyle
                            ]} onPress={() => {
                                if (this.Runing == false) {
                                    if (this.props.isAutoStart) {
                                        this.start();
                                    }
                                    this.props.timerOnPress && this.props.timerOnPress()
                                }
                            }}>
                                <Text style={[this.Runing ? this.props.timerIngTextStyle : this.props.timerNorTextStyle]}>
                                    {
                                        this._getShowText()
                                    }
                                </Text>
                            </TouchableOpacityThrottle>
                        </View>
                    )
                }}
            >
            </TextInput>
        )
    }

}

TimerTextInput.defaultProps = {
    ...TextInput.defaultProps,
    timer: 120,
    isAutoStart: true,
    showTitleHandle: function (timer, ing, value) {
        if (timer == this.timer || timer <= 0) {
            return "获取验证码"
        } else {
            return `${timer}s`
        }
    },
    timerNorContainerStyle: {
        borderColor: "#D1D1D6",
        borderWidth: SCALE_SIZE(2),
        borderRadius: SCALE_SIZE(8),
        paddingVertical: SCALE_SIZE(7),
        paddingHorizontal: SCALE_SIZE(15),
        justifyContent: 'center', alignItems: 'center',
    },
    timerIngContainerStyle: {
        borderColor: "#D1D1D6",
        borderWidth: SCALE_SIZE(2),
        borderRadius: SCALE_SIZE(8),
        paddingVertical: SCALE_SIZE(7),
        width: SCALE_SIZE(148),
        justifyContent: 'center', alignItems: 'center',
    },
    timerNorTextStyle: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: SCALE_SIZE(28),
        color: "#8E8E93"
    },
    timerIngTextStyle: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: SCALE_SIZE(28),
        color: "#8E8E93"
    }
}

TimerTextInput.propTypes = {
    /**
     * 继承TextInput
     */
    ...TextInput.propTypes,
    /**
     * 倒计时时间
     */
    timer: PropTypes.number,
    /**
     * 点击是否自动开始计时
     */
    isAutoStart: PropTypes.bool,
    /***
     * 提供显示的文字
     */
    showTitleHandle: PropTypes.func,
    /**
     * 正常情况下的容器样式
     */
    timerNorContainerStyle: PropTypes.any,
    /***
     * 倒计时时 容器样式
     */
    timerIngContainerStyle: PropTypes.any,
    /***
     * 正常情况下文字样式
     */
    timerNorTextStyle: PropTypes.any,
    /***
     * 倒计时 文字样式
     */
    timerIngTextStyle: PropTypes.any,
    /**
     * 倒计时 (开始 结束)函数
     */
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    /***
     * 倒计时触发函数
     */
    timerOnPress: PropTypes.func
}