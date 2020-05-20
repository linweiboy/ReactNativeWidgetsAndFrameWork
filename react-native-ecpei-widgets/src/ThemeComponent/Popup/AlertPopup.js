import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, Modal, TextStyle, StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import { View, Text } from "native-base";
import { BasePopup } from "./basePopup";
import computeProps from "../../utils/computeProps";


const STYLES = StyleSheet.create({
    Container: {
        borderRadius: SCALE_SIZE(24),
        backgroundColor: "#FFFFFF",
        width: SCALE_SIZE(560),
        height: SCALE_SIZE(280),
        overflow: 'hidden',
    }
})

class AlertPopupView extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            ...props.state
        }
    }
    _TitleComponent = () => {
        if (this.props.titleComponent) {
            return this.props.titleComponent(this);
        }
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[
                    {
                        fontFamily: "PingFangSC-Regular",
                        fontSize: SCALE_SIZE(30),
                        color: "#666666",
                        textAlign: 'center',
                        paddingHorizontal: 10
                    },
                    this.props.TitleStyle
                ]}>
                    {this.props.Title}
                </Text>
            </View>
        )
    }
    _onPress = (index, title) => {
        this.props.onPress && this.props.onPress(index, title, this)
    }
    _customViews = () => {
        if (this.props.customViews) {
            if (typeof this.props.customViews == 'function') {
                return this.props.customViews(this);
            }
            return this.props.customViews;
        }
        return null;
    }
    _bottomButtons = () => {
        if (this.props.customBottomView) {
            return this.props.customBottomView(this)
        } else {
            let buttons = [];
            let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
            let rypVariables = variables.rypVariables;
            if (rypVariables == null) {
                const { RypYo } = require("react-native-ecpei-framework")
                rypVariables = RypYo.appConfig && RypYo.appConfig.theme && RypYo.appConfig.theme.rypVariables;
            }
            let fontSize = rypVariables.AlertPopup_Buttons_Font_Size;
            let fontFamily = rypVariables.AlertPopup_Buttons_Font_Family;
            let spColor = rypVariables.AlertPopup_Splite_Bk_Color;
            for (let index = 0; index < this.props.buttonOptions.length; index++) {
                const element = this.props.buttonOptions[index];
                let color = "white";
                if (this.props.buttonOptions.length == 1) {
                    color = rypVariables.AlertPopup_Buttons_Font_Sure_Color
                } else {
                    if (index == 0)
                        color = rypVariables.AlertPopup_Buttons_Font_Normal_Color
                    else
                        color = rypVariables.AlertPopup_Buttons_Font_Sure_Color
                }
                buttons.push(
                    <TouchableOpacityThrottle key={index} style={[{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, element.containerStyle, index != 0 ? { borderLeftWidth: SCALE_SIZE(1), borderLeftColor: spColor, } : null]} onPress={() => {
                        this._onPress(index, element.title)
                    }}>
                        <Text style={[{ color, fontSize, fontFamily }, element.titleStyle]}>
                            {
                                element.title
                            }
                        </Text>
                    </TouchableOpacityThrottle>
                )
            }
            return buttons;
        }

    }
    render() {
        return (
            <View>
                <BasePopup
                    {...this.props}
                    style={[
                        {
                            borderRadius: SCALE_SIZE(24),
                            backgroundColor: "#FFFFFF",
                            width: SCALE_SIZE(560),
                            height: SCALE_SIZE(280),
                            overflow: 'hidden',
                        },
                        this.props.style
                    ]}
                    customViews={this._customViews()}
                    BottomContainerStyle={[
                        {
                            height: SCALE_SIZE(100),
                            flexDirection: 'row',
                            borderTopColor: "#E5E5E5",
                            borderTopWidth: SCALE_SIZE(1),
                        },
                        this.props.BottomContainerStyle
                    ]}
                    topContainerStyle={[
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        this.props.topContainerStyle
                    ]}


                    bottomViews={this._bottomButtons()}

                    titleComponent={this._TitleComponent()}
                >

                </BasePopup>
            </View>
        )
    }
    componentWillMount(){
        this.props.componentWillMount && this.props.componentWillMount(this);
    }
    componentDidMount(){
        this.props.componentDidMount && this.props.componentDidMount(this);
    }
    componentWillUnmount(){
        this.props.componentWillUnmount && this.props.componentWillUnmount(this);
    }

}
AlertPopupView.defaultProps = {
    Title: "确定要解除当前微信号?",
    buttonOptions: [
        {
            title: "取消",
            containerStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            titleStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: SCALE_SIZE(36),
                color: "#000000"
            }
        },
        {
            title: "确定",
            containerStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftWidth: SCALE_SIZE(1),
                borderLeftColor: "#E5E5E5",
            },
            titleStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: SCALE_SIZE(36),
                color: "#FE4B3A"
            }
        },
    ]
}
AlertPopupView.propTypes = {
    /***
     * 顶部
     * 自定义
     * 底部
     * 三个部分组件构成
     */


    /**
     * 继承BasePopup
     */
    // ...BasePopup.propTypes,
    /***
     * 设置state
     */
    state: PropTypes.any,
    /**
     * 三个组件生命周期回调
     */
    componentWillMount:PropTypes.func,
    componentDidMount:PropTypes.func,
    componentWillUnmount:PropTypes.func,
    /**
     * 标题样式
     */
    Title: PropTypes.string,
    TitleStyle: PropTypes.any,
    //自定义标题
    titleComponent: PropTypes.func,
    /***
    * 顶部组件容器样式
    */
    topContainerStyle: PropTypes.any,
    /***
     * 点击底部按钮
     */
    onPress: PropTypes.func,
    /**
     * 底部容器组件样式
     */
    BottomContainerStyle: PropTypes.any,
    /**
     * 配置底部按钮
     */
    buttonOptions: PropTypes.array,
    /**
     * 自定义底部组件
     */
    customBottomView: PropTypes.func,
    //自定义中部view
    /**
     * 处于按钮 和 标题 中间的视图
     */
    customViews: PropTypes.any,

    /**
     * 背景点击处理函数
     */
    bkClick:PropTypes.func
}


const ThemeAlertPopupView = RypTheme.registerComponent("NativeBase.RypAlertPopupView", AlertPopupView);

export {
    ThemeAlertPopupView as AlertPopupView
}