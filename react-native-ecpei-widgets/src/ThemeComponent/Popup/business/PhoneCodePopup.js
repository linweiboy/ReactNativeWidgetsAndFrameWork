import React, { Component } from 'react';
import {
    StyleSheet, Image, Modal, TextStyle, ImageBackground, TextInput, Platform,Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { View, Text } from "native-base";
import { BasePopup } from "../basePopup";
import HIcon from '../../../library/HIcon';
import BackgroundTimer from 'react-native-background-timer';

const STYLES = StyleSheet.create({
    titleStyle: {
        fontSize: SCALE_SIZE(44),
        fontFamily: 'PingFang-SC-Medium',
        color: "#333333"
    },
    subTitleStyle: {
        fontSize: SCALE_SIZE(26),
        fontFamily: 'PingFang-SC-Regular',
        color: "#666666",
        lineHeight: SCALE_SIZE(48)
    },
    codeStyle: {
        fontSize: SCALE_SIZE(60),
        fontFamily: 'PingFang-SC-Medium',
        color: "#333333",
    },
    inputStyle: {
        marginVertical: SCALE_SIZE(56),
    },
    button: {
        height: SCALE_SIZE(80),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(8),
        height: SCALE_SIZE(80),
        marginTop: SCALE_SIZE(56),
    },
    buttonTextStyle: {
        fontFamily: "PingFang-SC-Regular",
        fontSize: SCALE_SIZE(30),
        color: "white"
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeSend: {
        fontSize: SCALE_SIZE(22),
        fontFamily: 'PingFang-SC-Regular',
        color: "#8E8E93",
    },
    codeNoSend: {
        fontSize: SCALE_SIZE(22),
        fontFamily: 'PingFang-SC-Regular',
        color: "#4D78E7",
    }

})

/**
 *
 * onPress (index,context)
 *  3 获取验证码 return promoise
 *  2 点击完成 return promoise true关闭
 *  1 关闭
 */
export const PhoneCodeStyle = {
    _type: "AlertPopupView",
    code: "176****388",
    state: {
        context: "",
        isSend: false,
        codeTime: 60, //倒计时总数
        lastTime: 0
    },
    style: {
        borderRadius: SCALE_SIZE(24),
        backgroundColor: "white",
        width: SCALE_SIZE(614),
        height: SCALE_SIZE(576),
        overflow: 'hidden',
    },
    topContainerStyle: {
        height: SCALE_SIZE(70),
        // backgroundColor: "red",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: SCALE_SIZE(10),
    },
    titleComponent: (target) => {
        return (
            <TouchableOpacityThrottle style={[STYLES.center, { height: SCALE_SIZE(70), width: SCALE_SIZE(80) }]} onPress={() => {
                target.interval && clearInterval(target.interval);
                target.props.onPress(1);
            }}>
                <HIcon name={"close"} size={16}></HIcon>
            </TouchableOpacityThrottle>
        )
    },
    customViewsStyle: {
        titleStyle: null,
        subTitleStyle: null,
        codeStyle: null,
        inputStyle: null
    },
    //输入框属性
    inputProps: {
        maxLength: 4,
        placeholder: "请输入验证码",
        style: Platform.select({
            ios: { marginVertical: 15 }
        })
    },
    bkClick:(target)=>{
        Keyboard.dismiss()
    },
    timerHandle: (target) => {//倒计时
        target.interval && BackgroundTimer.clearInterval(target.interval);
        target.interval = BackgroundTimer.setInterval(() => {
            let time = target.state.lastTime - 1;
            if (time == 0) {
                target.interval && clearInterval(target.interval);
                target.setState({
                    isSend: false,
                    lastTime: 0
                })
            } else {
                target.setState({ lastTime: time })
            }
        }, 1000)
        target.setState({
            lastTime: target.state.codeTime - 1
        })
    },
    componentDidMount: (target) => {
        target.setState({ isSend: true });
        target.props.timerHandle(target)
    },
    componentWillUnmount: (target) => {
        target.interval && BackgroundTimer.clearInterval(target.interval);
    },
    customViews: (target) => {
        let inputOps = target.props.inputProps;
        let styles = target.props.customViewsStyle;
        let code = target.props.code;
        let isCanFinish = target.state.context && target.state.context.length == (inputOps.maxLength || 4);
        return (
            <View style={[{ height: SCALE_SIZE(500), padding: SCALE_SIZE(64), paddingTop: 0 }]}>
                <Text style={[STYLES.titleStyle, styles.titleStyle]}>验证手机号</Text>
                <Text style={[STYLES.subTitleStyle, styles.subTitleStyle]}>已发送短信验证码到</Text>
                <Text style={[STYLES.codeStyle, styles.codeStyle]}>{code}</Text>
                <View style={{ flexDirection: 'row', borderBottomColor: "#666666", borderBottomWidth: SCALE_SIZE(2) }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            maxLength={inputOps.maxLength || 4}
                            keyboardType={"numeric"}
                            underlineColorAndroid={"transparent"}

                            {
                            ...inputOps
                            }
                            onChangeText={(context) => {
                                target.setState({ context });
                            }}
                            onBlur={() => target.onInput = false}
                            onFocus={() => target.onInput = true}
                            value={target.state.context}
                        >

                        </TextInput>
                    </View>
                    {
                        (target.state.context && target.state.context.length >= 1 && target.onInput) ?
                            <TouchableOpacityThrottle
                                style={[{ padding: SCALE_SIZE(30) }, STYLES.center]}
                                onPress={() => target.setState({ context: "" })}
                            >
                                <HIcon name={"delete-x"} size={14}></HIcon>
                            </TouchableOpacityThrottle>
                            : null
                    }
                    <TouchableOpacityThrottle style={[STYLES.center]}
                        onPress={() => {
                            if (!target.state.isSend) {
                                // let promise = target.props.onPress(3)
                                // if (promise)
                                //     promise.then((res) => {
                                //         res && target.setState({ isSend: true });
                                //         target.props.timerHandle(target)
                                //     })


                                target.props.onPress(3, target.state.context, () => {
                                    target.setState({ isSend: true });
                                    target.props.timerHandle(target)
                                })
                            }
                        }}
                    >
                        <Text style={target.state.isSend ? STYLES.codeSend : STYLES.codeNoSend}>
                            {
                                target.state.isSend ? `${target.state.lastTime}s 后重新获取` : "重新获取"
                            }
                        </Text>
                    </TouchableOpacityThrottle>
                </View>
                <TouchableOpacityThrottle style={[
                    STYLES.button,
                    isCanFinish ?
                        { backgroundColor: "#4D78E7" } :
                        { backgroundColor: "#E5E5E5" }
                ]} onPress={() => {
                    if (target.state.context && target.state.context.length == 4) {
                        target.props.onPress(2, target.state.context, () => {
                            target.interval && BackgroundTimer.clearInterval(target.interval);
                            target.props.onPress(1)
                        })

                    }
                }}>
                    <Text style={[
                        STYLES.buttonTextStyle,
                        isCanFinish ? {
                            color: "white"
                        } : {
                                color: "#BBBBBB"
                            }
                    ]}>完成</Text>
                </TouchableOpacityThrottle>
            </View>
        )
    },
    BottomContainerStyle: { height: 0 },
    customBottomView: () => {
        return null;
    }
}
